import * as moment from "moment";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get readableDate() {
    // return this.date.toLocalDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "digit",
    //   minute: "digit",
    // });
    return moment(this.date).format("MM-DD-YYYY, hh:mm");
  }
}

export default Order;
