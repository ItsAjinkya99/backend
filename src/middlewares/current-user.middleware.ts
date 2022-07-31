import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomerService } from 'src/controllers/customer/customer.service';
import { VendorService } from 'src/controllers/vendor/vendor.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  user: any;
  constructor(private customerService: CustomerService,
    private vendorService: VendorService) {

  }
  async use(req: any, res: any, next: () => void) {
    const session = req.session || {};
    if (session?.vendorId) {
      this.user = await this.vendorService.findOne(session.vendorId);
      req.currentUser = this.user;
    } else if(session?.customerId) {
      this.user= await this.customerService.findOne(session.customerId);
    }

    next();
  }
}