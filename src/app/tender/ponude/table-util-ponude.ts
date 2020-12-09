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
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
        </head>
    </head>
<body onload="window.print();window.close()"><table id="moj" class="table table-bordered">${printContents}</table></body>
$("#tablerecords th:last-child, #tablerecords td:last-child").hide();
  </html>`
    );
    popupWin.document.close();
  }
}
