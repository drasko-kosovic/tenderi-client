ng g m tender -m app --routing
ng g c home -app --inline-template --inline-style
npm install --save mat-table-exporter

https://angular.io/start/start-forms



  calculation() {
    let sum = 0;
    if (this.dataSource) {
      for (const row of this.dataSource.data) {
        // tslint:disable-next-line:triple-equals
        if (row.id != 0) { sum += row.ponudjenaUkupnaCijena; }
      }
    }
    return sum;
  }

  private refreshTable() {
    this.paginator.changePpartijaSize(this.paginator.firstPage);
  }

