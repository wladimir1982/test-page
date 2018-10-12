import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SiteLayoutService} from '../shared/services/site-layout.service';
import {Category, City, Data} from '../shared/interfaces';
import {DxRangeSliderComponent} from 'devextreme-angular';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SiteLayoutComponent implements OnInit {

  public label: any;
  public tooltip: any;
  public tooltipEnabled: any;

  public cities: City[];
  public categories: Category[];
  public categoryBox: Data[];
  public categoriesChecked = [];
  public dataset: Data[];
  public filtered: Data[];
  public loading = false;
  form: FormGroup;

  @ViewChild('rangeSlider') rangeSliderRef: DxRangeSliderComponent;

  constructor(private siteLayoutService: SiteLayoutService) {
    this.label = {
      visible: true,
      format: (value) => {
        return this.format(value);
      },
      position: 'top'
    };
    this.tooltip = {
      enabled: true,
      format: (value) => {
        return this.format(value);
      },
      showMode: 'always',
      position: 'bottom'
    };
    this.tooltipEnabled = {
      enabled: true
    };
  }

  private format(value) {
    return value + '%';
  }

  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl(''),
      category: new FormControl('')
    });

    this.siteLayoutService.getAllCities().subscribe(cities => {
      this.cities = cities;
    });

    this.loading = true;
    this.siteLayoutService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });

    this.loading = true;
    this.siteLayoutService.getDates().subscribe(dataset => {
      this.dataset = dataset;
      this.categoryBox = JSON.parse(JSON.stringify(dataset));
      this.filtered = (sessionStorage.getItem('filtered') !== null) ? JSON
        .parse(sessionStorage.getItem('filtered')) : JSON.parse(JSON.stringify(dataset));
      this.loading = false;
    });
  }

  public change(id: string) {
    this.filtered = this.dataset.filter(d => id === d.id.toString());
    sessionStorage.setItem('filtered', JSON.stringify(this.filtered));
  }

  public filterCategories(event, id: string): void {
    if (event.target.checked) {
      this.dataset.filter((d: Category, i: number) => {
        if (id === d.id.toString()) {
          this.categoriesChecked.splice(i, 1);
          this.categoriesChecked.push(d);
        }
      });
      this.filtered = this.categoriesChecked;
    } else {
      this.filtered.find((d: Category, i: number) => {
        if (id === d.id.toString()) {
          this.categoriesChecked.splice(i, 1);
          if (!this.categoriesChecked.length) {
             this.filtered = this.categoryBox;
          }
          return true;
        }
      });
    }
    sessionStorage.setItem('filtered', JSON.stringify(this.filtered));
  }

  public filterPrice(): void {
    const min = this.rangeSliderRef.start;
    const max = this.rangeSliderRef.end;
    this.filtered.length = 0;
    this.dataset.filter(d => {
      if (d.price >= min && d.price <= max) {
        this.filtered.push(d);
      }
    });
    sessionStorage.setItem('filtered', JSON.stringify(this.filtered));
  }
}
