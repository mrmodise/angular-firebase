import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map} from 'rxjs/operators';

export interface Company {
  key: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  company$: Observable<any>;
  companies$: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object('company').valueChanges();
    this.companies$ = this.db.list('companies');
  }

  /*----------- OBJECTS ---------------*/
  saveCompany(company) {
    const comp = this.db.object('company');
    comp.set(company).then(console.log).catch(console.log);
  }

  editCompany(company) {
    const comp = this.db.object('company');
    comp.update(company).then(console.log).catch(console.log);
  }

  removeCompany() {
    const comp = this.db.object('company');
    comp.remove().then(console.log).catch(console.log);
  }

  /*----------- LISTS ---------------*/
  getCompanies() {
    return this.db.list('companies')
      .snapshotChanges().pipe(map(actions =>
        actions.map(a => ({key: a.key, ...a.payload.val()}))));
  }

  getCompany(companyKey: string) {
    return this.db.object(`companies/${companyKey}`).valueChanges();
  }

  saveCompanyList(company: Company) {
    this.companies$.push(company).then(console.log).catch(console.log);
  }

  editCompanyList(company: Company) {
    this.companies$.update(company.name, company).then(console.log).catch(console.log);
  }

}
