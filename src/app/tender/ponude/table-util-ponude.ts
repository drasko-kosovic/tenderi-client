import {ElementRef, Injectable, ViewChild} from '@angular/core';
@Injectable()
export class TableUtilPonude {

  @ViewChild('reportContent') reportContent: ElementRef;
  static exportToPdf(tableId: string, name?: string) {
    let printContents, popupWin;
    printContents = document.getElementById(tableId).innerHTML;
    console.log(printContents);
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <title>Ponude</title>

    </head>
<body onload="window.print();window.close()"><table id="moj" class="table table-bordered">${printContents}</table></body>
  </html>`
    );
    popupWin.document.close();
  }
}
