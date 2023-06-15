export type UFResponse<T> = {
  statusCode: number;
  data: UFData<T>;
}
  
export type UFData<T> = {
  result: number;
  contents: T;
}
  
export type UFEvent = {
  event_color: string;
  event_date_display_text: string;
  event_day: string;
  event_day_of_week: string;
  event_month: string;
  event_open_day: string;
  event_open_hours: string;
  event_open_minutes: string;
  event_open_month: string;
  event_open_setting_flag: number;
  event_open_year: string;
  event_start_day: string;
  event_start_hours: string;
  event_start_minutes: string;
  event_start_month: string;
  event_start_setting_flag: number;
  event_start_year: string;
  event_time_display_text: string;
  event_url: string;
  event_year: string;
  id: number;
  name: string;
  testdata_flag: number;
  venue: string;
};

export type UFItem = {
  id: number;
  code: string;
  name: string;
  abbreviation: string;
  category: string;
  image_urls: string[];
  discount_flag: number;
  have_size_flag: number;
  have_stock_flag: number;
  stock_remaining: number;
  display_order: number;
  kbn_item_class: number;
  new_icon_display_flag: number;
  artistCode: string;
  artist: string;
  price: number;
  order_limit_flag: number;
  order_limit: number;
}
