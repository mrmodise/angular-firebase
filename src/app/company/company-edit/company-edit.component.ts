import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company$: Observable<any>;

  constructor(private companyService: CompanyService) {
    this.company$ = this.companyService.company$;
  }

  ngOnInit() {
  }

  saveCompany(company) {
    this.companyService.saveCompany(company);
  }

  editCompany(company) {
    this.companyService.editCompany(company);
  }

  removeCompany(company) {
    this.companyService.removeCompany(company);
  }
}
