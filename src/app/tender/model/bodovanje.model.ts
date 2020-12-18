export interface Bodovanje {
  id: number;
  
  partija: number;

  atc: number;

  naziv_proizvoda: string;

  zasticeni_naziv: string;

  proizvodjac: string;

  farmaceutski_oblik: string;

  pakovanje: string;

  trazena_kolicina: number;

  ponudjana_kolicina: number;

  procijenjena_jedinicna_cijena: number;

  ponudjena_jedinicna_cijena: number;

  procijenjena_ukupna_cijena: number;

  ponudjena_ukupna_cijena: number;

  rok_isporuke: number;

  ponudjac: string;

  broj_tendera: number;

  bod_cijena: number;

  bod_rok: number;

  bod_ukupno: number;


}
