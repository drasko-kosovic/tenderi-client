export interface Ponude {
  id: number;
  partija: number;

  atc: number;

  nazivProizvoda: string;

  zasticeniNaziv: string;

  proizvodjac: string;

  farmaceutskiOblik: string;
  pakovanje: string;

  trazenaKolicina: number;

  ponudjanaKolicina: number;

  procijenjenaJedinicnaCijena: number;

  ponudjenaJedinicnaCijena: number;

  procijenjenaUkupnaCijena: number;

  ponudjenaUkupnaCijena: number;

  rokIsporuke: number;

  ponudjac: string;

  brojTendera: string;

}
