import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "pharmaweb-1e1e8", appId: "1:529986007006:web:15837f3a56ab8b4d97b74f", storageBucket: "pharmaweb-1e1e8.firebasestorage.app", apiKey: "AIzaSyBQ8aB5G2mtP4XFRlPk-Y9BmN6DnjVHWr4", authDomain: "pharmaweb-1e1e8.firebaseapp.com", messagingSenderId: "529986007006", measurementId: "G-33B7QQQT7P" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
