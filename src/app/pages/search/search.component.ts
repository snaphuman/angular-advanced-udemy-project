import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital-model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private searchService: SearchService,
               private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({term}) => {
      this.search(term);
    })
  }

  search( term: string ) {
    this.searchService.globalSearch( term ).subscribe((res: any) => {
      console.log(res);
      this.users = res.usuarios;
      this.doctors = res.medicos;
      this.hospitals = res.hospitales;
    })
  }

  openDoctor( {_id} ) {
    this.router.navigateByUrl('/dashboard/doctors/'+_id)
  }

}
