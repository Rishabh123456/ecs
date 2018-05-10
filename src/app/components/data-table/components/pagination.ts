import { Component, Inject, forwardRef } from '@angular/core';
import { DataTable } from './table';


@Component({
  selector: 'data-table-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class DataTablePagination {

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {}
    
    public limits = [10, 20, 50, 100];

    pageBack() {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    }

    pageForward() {
        this.dataTable.offset += this.dataTable.limit;
    }

    pageFirst() {
        this.dataTable.offset = 0;
    }

    pageLast() {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    }

    get maxPage() {
        return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
    }

    get limit() {
        return this.dataTable.limit;
    }

    set limit(value) {
        this.dataTable.limit = Number(<any>value); // TODO better way to handle that value of number <input> is string?
    }

    get page() {
        return this.dataTable.page;
    }

    set page(value) {
        this.dataTable.page = Number(<any>value);
    }
}
