export class Client {
  clientId: number
  contactPersonName: string
  companyName: string
  address: string
  city: string
  pincode: string
  state: string
  employeeStrength: number
  gstNo: string
  contactNo: string
  regNo: string

  constructor(){
    this.address='';
    this.city='';
    this.clientId=0;
    this.companyName='';
    this.contactNo='';
    this.contactPersonName='';
    this.employeeStrength=0;
    this.gstNo='';
    this.pincode='';
    this.regNo='';
    this.state='';
  }
}
