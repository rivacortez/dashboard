import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Merchandise } from '../../model/merchandise.entity';
import { MerchandiseService } from '../../services/merchandise.service';
import { NgForOf } from '@angular/common';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-merchandise-item',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    NgForOf,
    MatButtonToggle
  ],
  templateUrl: './merchandise-item.component.html',
  styleUrls: ['./merchandise-item.component.css']
})
export class MerchandiseItemComponent implements OnInit {
  merchandises: Merchandise[] = [];

  constructor(private merchandiseService: MerchandiseService) {}

  ngOnInit() {
    this.merchandiseService.getAll()
      .subscribe(data => {
          console.log('Data:', data);
          this.merchandises = data;
        },
        error => console.error('Error:', error)
      );
  }
}
