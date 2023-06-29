// !!!!!!!!!!! api-ის დაიმპორტება რომ დაგვჭირდება არ მივმართოთ პირდაპირ getRegions() !!!!!!!!!!!!
// ვაიმპორტებთ ამ ფაილიდან :
// import * as callApi from '../../service';
// გამოყენებისას callApi.areas.getRegions()
// ამისთვის ყველა სერვისის ფაილს გავუკეთებთ იმპორტს ამ ფაილში სასურველი სახელით

export * as users from './user';
export * as employee from './employee';
export * as organizations from './organizations';
export * as timeSheets from './timeSheets';
export * as area from './areas';
