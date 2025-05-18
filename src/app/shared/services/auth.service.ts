import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;
  
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }
  
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }
  
  async signUp(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        cart: []
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);
    return setDoc(userRef, userData);
  }
  
  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }
  
  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

  // 🛒 Kosár kezelése
  async addToCart(userId: string, productId: string): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      const updatedCart = [...userData.cart, productId];
      await updateDoc(userRef, { cart: updatedCart });
    } else {
      console.error("User not found.");
    }
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      const updatedCart = userData.cart.filter(item => item !== productId);
      await updateDoc(userRef, { cart: updatedCart });
    } else {
      console.error("User not found.");
    }
  }

  async getCart(userId: string): Promise<string[]> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      return userData.cart;
    } else {
      console.error("User not found.");
      return [];
    }
  }

  async getUserData(userId: string): Promise<User | null> {
  const userRef = doc(this.firestore, 'Users', userId);
  const userSnapshot = await getDoc(userRef);
  return userSnapshot.exists() ? (userSnapshot.data() as User) : null;
  }

}