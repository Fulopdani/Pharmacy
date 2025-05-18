import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service'; 
import { User as FirebaseUser, deleteUser } from '@angular/fire/auth';
import { doc, deleteDoc, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile-delete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profiledelete.component.html',
  styleUrl: './profiledelete.component.scss'
})
export class ProfiledeleteComponent {
  currentUser: FirebaseUser | null = null;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  async deleteProfile(): Promise<void> {
    if (!this.currentUser) return;

    try {
      const userRef = doc(this.firestore, 'Users', this.currentUser.uid);
      await deleteDoc(userRef);

      await deleteUser(this.currentUser);

      this.authService.updateLoginStatus(false);
      this.router.navigateByUrl('/home');
      console.log('Felhasználói fiók törölve.');
    } catch (error) {
      console.error('Hiba a profil törlése során:', error);
    }
  }
}
