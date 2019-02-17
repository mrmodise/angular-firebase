import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyKey: string;
  company$: Observable<any>;
  private isNewCompany: boolean;

  constructor(private companyService: CompanyService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    // this.company$ = this.companyService.company$;
    console.log(`Company is ${JSON.stringify(this.company$)}`);
  }

  ngOnInit() {
    this.companyKey = this.activateRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    !this.isNewCompany ? this.getCompany() : this.company$ = of({});
  }

  getCompany() {
    this.company$ = this.companyService.getCompany(this.companyKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany ?
      this.companyService.saveCompanyList(company) :
      this.companyService.editCompanyList(this.companyKey, company);
    save.then(_ => this.router.navigate(['/company-list']));
  }

  removeCompany() {
    this.companyService.removeCompany(this.companyKey)
      .then(_ => this.router.navigate(['/company-list']));
  }
}
