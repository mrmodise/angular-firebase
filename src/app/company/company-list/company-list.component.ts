import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Observable<any[]>;

  constructor(private companyService: CompanyService) {
    this.companies = this.companyService.getCompanies();
    this.companies.subscribe(v => {
      console.log(`value ${JSON.stringify(v)}`);
    });
  }

  ngOnInit() {
  }
}
