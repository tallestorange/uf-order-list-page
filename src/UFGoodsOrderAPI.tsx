import axios from 'axios';
import {UFResponse, UFEvent, UFItem} from './UFGoodsOrderType';

export function get_events(on_completed: (events: UFEvent[]) => void) {
  const url = 'http://dcf-order-app-prod-web-api-elb-1380278707.ap-northeast-1.elb.amazonaws.com//get-events';
  axios.post<UFResponse<UFEvent[]>>(url).then(response => {
    const events = response.data.data.contents;
    on_completed(events)
  });  
}

export function get_stocks(event_id: number, on_completed: (items: UFItem[]) => void) {
  const url = 'http://dcf-order-app-prod-web-api-elb-1380278707.ap-northeast-1.elb.amazonaws.com//get-eventitems';
  const params = new URLSearchParams();
  params.append('eventId', event_id.toString());
  params.append('includeSoldOutFlag', '1');
  params.append('sizeGroupingFlag', '1');

  axios.post<UFResponse<UFItem[]>>(url, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
    const events = response.data.data.contents;
    on_completed(events);
  });  
}
