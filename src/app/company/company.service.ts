import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  company$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object('company').valueChanges();
  }

  saveCompany(company) {
    const comp = this.db.object('company');
    comp.set({name: company}).then(console.log).catch(console.log);
  }

  editCompany(company) {
    const comp = this.db.object('company');
    comp.update({name: company}).then(console.log).catch(console.log);
  }

  removeCompany() {
    const comp = this.db.object('company');
    comp.remove().then(console.log).catch(console.log);
  }
}
