
export const DriverTypeEnum = {
  LEADER: 1,
  NORMAL: 0
}

export const OrderStatusEnum = {
  NOT_PAID: 0, // 0: 等待支付
  PAID: 1,
  GOT_ACCEPT_AND_ASSIGNING: 2, // 弃用
  TRIP_STARTED: 4, // 弃用
  TRIP_GET_IN: 5, // 弃用
  TRIP_GET_OFF: 6, // 弃用
  ASSIGNED: 3,
  ACCEPTED: 11,
  REJECTED: 10,
  STARTED: 7,
  CLOSED: 8,
  CANCLED: 9,
  REFUND: 12, // 等待退款
  GET_REFUND: 13, // 已退款
  GET_CONFIRMED: 14 // 订单已确认
}
export const AppointmentStatus = {
  WAIT_TO_STARTED: 0,
  STARTED: 1,
  CLOSED: 2,
  CANCLED: 3
}
export const OrderType = {
  SEAT_SHARING: 0, // 拼车
  SEAT_FIVE: 1, // 五座包车
  SEAT_SEVEN: 2 // 七座包车
}
export const DriverStatusEnum = {
  WAITING: 0, // 等待接单中...
  CARPOOLING: 1, // 接单中...
  START: 2, // 开始送客
  CLOSE: 3 // 结束送客
}

