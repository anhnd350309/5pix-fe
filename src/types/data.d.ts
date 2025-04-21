import { OrderInternalStatus } from '@/constants/order'
import { COURSE_TYPE } from '@/constants/race-course'
import { string } from 'zod'
import { FieldType } from './course'

export declare namespace Data {
  type ID = number
  type DateString = string
  interface Base {
    id: ID
    created_on: DateString
    modified_on: DateString
  }

  /**
   * User
   */
  interface User extends Base {
    email: string
    name: string
    phone: string
    avatar: string
    account_type: 'FREE'
    social: 'NONE'
    created_at: string
    is_enabled: boolean
    is_actived: boolean
    is_ekyc_success: boolean
    role: {
      id: number
      // name: UserRole;
      name: string
      newRolePermissions: []
    }
    username: string
  }
  interface UserIdCard {
    id: number
    idNumber: string
    gender: string
    dob: string
    name: string
    ocrVendor: string
    ekycMetadata: []
    cardType: string
    detail: string
    createdAt: DateString
    updatedAt: DateString
    isDelete: false
    user_id: number
  }
  interface Address {
    location: string
    province: string
    district: string
    ward: string
  }
  interface RaceDetail extends Base, Address {
    product: string
    title: string
    images: string
    season: string
    description: string
    // brand: string?
    status: string //ListStatus
    // hotline: string?
    rule: null
    prefix: string
    isDelete: false
    sapoProductId: string
    product_id: string
    event_type: null
    event_start_date: DateString
    event_end_date: DateString
    event_category: null
    transfer_type: null
    url_name: null
    assert_transfer_fee: null
    // logo_url: string?
    term_id: null
    email_template_id: null
    is_show: null
    event_director: string
    event_start_date: DateString
    event_end_date: DateString
    blacklist_id: number
    registration_start_time: DateString
    registration_end_time: DateString
    reassign_start_time: DateString
    reassign_end_time: DateString
    checkin_start_time: DateString
    checkin_end_time: DateString
    racekit_start_time: DateString
    racekit_end_time: DateString
    racekit_location: string
    insurance_type: null
    insurance_agency_id: null
    insurance_link_cert: null
    insurance_content: null
    insurance_race_code: null
    insurance_sport: null
    insurance_package: null
    insurance_limit: null
    race_course_ids: number[]
    ticket_phases: string[]
    template_id: null
    tenant_id: 3
    race_type: string
    // metadata: string?
    required_transfer_fee: boolean
    race_extenstion?: {
      slug?: string
      url?: string
      url2?: string
      t_shirt_sizes?: string
      t_shirt_size_table_url?: string
      payment_options?: string | null
      acq_info?: string | null
      transfer_fee?: number
      buy_group_condition: {
        conditions: [
          {
            min_quantity: number
            discount_percent: number
          },
        ]
      }
    }

    race_course_bases: Array<RaceCourse>
    skip_register: boolean
    race_extension?: any
    is_buy_group?: boolean
  }
  interface RaceMetadata {
    desc: { content: string; title: string }[]
    creators: { name: string; file?: null | string }[]
  }

  /**
   * Course
   */
  interface RaceCourse extends Base {
    name: string
    distance: string
    prefix: string
    wave: null
    price: number
    deleted: false
    race_id: number
    variant_id: number
    max_participate: number
    max_ticket_per_order: number
    min_ticket_per_order: number
    open_for_sale_date_time: DateString
    close_for_sale_date_time: DateString
    ticket_types: Array<TicketType>
    course_type: COURSE_TYPE
    // new field
    // description: string?
    // route_map_image_url: string?
    // medal_url: string?
    // ticket_image_url: string?
    // route_image_url: string?
    // route_map_image_url: string?
    customize_fields: CustomizeFields
  }

  type CustomizeField = {
    field_type: FieldType
    field_name: string
    field_label: string | null
    selected_value: null | string | number
    default_value: string | number | null
    options: Array<string> | null
    metadata: any
    required: boolean
    is_display: boolean
  }

  export type CustomizeFields = {
    fields: Array<CustomizeField>
  }

  /**
   * Ticket
   */
  interface Ticket extends Base {
    value: string
    status: string // TicketStatus;
    course_id: number
    athlete_status: string //AthleteStatus;
    receipt_email?: string
    order_id: string | number
  }

  interface TicketType extends Base {
    price: number
    type_name: string
    race_course_id: number
    course_type: COURSE_TYPE
    max_participate: number
    max_ticket_per_order: number
    min_ticket_per_order: number
    valid_from: string
    valid_to: string
    remained_ticket: number
    id: number
    variant_id: number
    race_course_distance?: string
    ticket_image_url?: string
    race_course_name: string
    race_course_id?: number
    is_show?: boolean
  }

  interface TicketCode extends Base, TicketType {
    race: RaceDetail
    race_course_distance: string
    race_course_name: string
    type_name: string
  }

  /**
   * Order
   */
  interface Order extends Base {
    // cancel_reason: string?
    // cancelled_on: string?
    createByUserId: number
    // discount_code: DiscountCode?
    email: string
    financial_status: string
    internal_status: OrderInternalStatus
    line_items: Array<OrderLineItem>
    name: string
    // note: string?
    payment_method: 'UNKNOWN' | string
    // payment_on: DateString?
    payment_status: 'PROCESSING' | string
    // processed_on: DateString?
    race: RaceDetail
    race_id: number
    status: 'open' | string
    sub_total_price: number
    token: string
    total_discounts: number
    total_line_items_price: number
    total_price: number
    // userId: number;
    // vat_metadata: string?
    race_image_url: string
    // phone_number: string?
    // first_name: string?
    last_name: string?
  }
  interface OrderLineItem extends Base {
    order_id: number
    price: number
    // processed_on: string?
    quantity: number
    ticketType: TicketCode
    ticket_type_id: number
    total_discount: number
    variant_id: number

    athlete_sub_info?: Array<any>
  }

  interface DiscountCode {
    id: number
    priceRule: {
      id: number
      note: string | null
      deleted: boolean
      value_type: 'percentage' | 'fixed_amount' // Add more types if needed
      title: string
      name: string
      value: number
      customer_selection: 'all' | 'targeted' // Add more options if needed
      target_selection: 'entitled' | 'specific_products' // Add more options if needed
      allocation_method: 'across' | 'each' // Add more options if needed
      once_per_customer: boolean
      usage_limit: number
      usage_count: number
      prerequisite_subtotal_range: null // You can define a type for this if needed
      min_subtotal: null // You can define a type for this if needed
      prerequisite_quantity_range: null // You can define a type for this if needed
      min_quantity: null // You can define a type for this if needed
      activate_status: 'ACTIVATE' | 'INACTIVE' // Add more options if needed
      max_quantity: number
      promotion_scope: 'ALL' | 'SINGLE' // Add more options if needed
      starts_on: string // Date string in ISO 8601 format
      ends_on: string // Date string in ISO 8601 format
      created_on: string // Date string in ISO 8601 format
      modified_on: string // Date string in ISO 8601 format
      race_id: number
      tenant_id: number
      entitled_variant_ids: number[] // Array of variant IDs
      value_represent: string
      is_in_active_duration: boolean
    }
    code: string
    deleted: boolean
    discountAmount: number
    discountType: 'percentage' | 'fixed_amount' // Add more types if needed
    race_id: number
    price_rule_id: number
    is_used: boolean
    usage_counter: number
    created_on: string // Date string in ISO 8601 format
    modified_on: string // Date string in ISO 8601 format
    discount_status: 'ACTIVE' | 'INACTIVE' // Add more options if needed
    is_manual_code: boolean
  }

  // Result
  interface Result {
    'Overall Rank': number
    'Gender Rank': number
    BIB: number
    Name: string
    'Finish Time': string
    Certificate: string
  }

  // Profile
  interface Profile extends Base {
    birthday: string
    blood_group: string
    countryCode: string
    current_medication: string
    detail: string
    email?: string
    full_guardian_phone_number: null
    full_phone_number: string
    full_sos_phone_number: string
    gender?: string
    guardian_card_id?: string
    guardian_dob?: string
    guardian_email?: string
    guardian_name?: string
    guardian_phone_number?: string
    guardian_phone_number_country_code?: string
    guardian_relationship?: string
    guardian_shirt_size?: string
    guardian_bib_name?: string
    height?: string
    id_card: string
    medical_info_detail: string
    name: string
    first_name: string
    last_name: string
    national: string
    phone_number: string
    // racekit: string?
    sos_phone: string
    sos_phone_country_code: string
    // target_user_id: number?
    user_id: number
    // weight: string?
    is_self?: boolean
    is_ekyc_success?: boolean
    //NOTE: nationality sử dụng trong group buy
    nationality?: string
    guardian_sex?: string
    guardian_address?: string
  }
  interface Athlete extends Base {
    name: string
    email: string
    minLength: 0
    gender: string
    idpp: string
    nationality: string
    dob: string
    result: any
    achievements: string
    sos_phone: string
    club: string
    racekit: string
    bib: string
    note: string
    last_status: string
    best_practice: string
    contact_phone: string
    medical_info: string
    tshirt_size: string
    metadata: string
    blood_type: string
    delegator_name: string
    delegator_phone: string
    delegator_email: string
    delegator_cccd: string
    address: string
    health_status: string
    metadata_text: string
    disclaimer_status: string
    current_medication: string
    name_on_bib: string
    living_place: string
    athlete_represent: AthleteRepresent
    athlete_sub_info: AthleteSubInfo
    bib_number?: string
    race_course: RaceCourse
    race_id: number
    code_value: string
    available_to_roll: boolean
    rolling_bib_valid_until?: string
    rolling_bib_last_time?: string
    course_info: {
      ticket_image?: string
      distance?: string
      route_image?: string
      race_name?: string
      course_name?: string
      medal_url?: string
    }
  }

  interface AthleteRepresent extends Base {
    name: string
    email: string
    idpp: string
    detail: string
    guardian_name: string
    guardian_dob: string
    guardian_card_id: string
    guardian_email: string
    guardian_phone_number: string
    guardian_relationship: string
    guardian_shirt_size: string
    guardian_bib_name: string
    guardian_address: string
    guardian_sex: string
  }
  interface AthleteSubInfo extends Base {
    nationality: string
    achievements: string
    best_practice: string
    club: string
    contact_phone: string
    dob: string
    id_number: string
    medical_info: string
    name: string
    note: string
    racekit: string
    sos_phone: string
    tshirt_size: string
    current_medication: string
    name_on_bib: string
    gender: string
    email: string
    idpp: string
    detail: string
    is_represent: string
    disclaimer_status: string
    living_place: string
    address: string
    blood_type: string
    delegator_name: string
    delegator_phone: string
    delegator_email: string
    delegator_cccd: string
    first_name: string
    last_name: string
    guardian_name: string
    guardian_dob: string
    guardian_card_id: string
    guardian_email: string
    guardian_phone_number: string
    guardian_relationship: string
    customize_fields: CustomizeFields
  }

  //group-buy
  interface OwnerGroup extends Base {
    user_line_info: {
      user_name: string
      course_name: string
      user_email: string
    }
    already_payment: boolean
    athleteSubInfo: AthleteSubInfo
    athlete_represent: AthleteRepresent
    course_id: string
  }

  interface GroupBuy extends Base {
    name: string
    note: string
    status: string
    owner_name: string
    owner_phone: string
    owner_email: string
    owner_bank: string
    owner_bank_account: string
    owner_bank_name: string
    admin_note: string | null
    is_approved: boolean
    approved_by: string | null
    approved_date: string | null
    count_line: number
    owner_id: number
    race_id: number
    payment_order_id: string | null
    close_date: string
    processed_on: string
    modified_on: string
    has_password: boolean
    race_info: Pick<RaceDetail, 'title', 'location', 'images', 'start_date', 'end_date'>
  }

  interface MemberGroup extends Base {
    athlete_first_name: string
    athlete_last_name: string
    athlete_name: string
    course_distance: string
    course_name: string
    line_owner?: boolean
    line_status?: string
    line_sub_info?: AthleteSubInfo
    race_name: string
    user_email: string
    user_name: string
  }

  //Race result
  interface RaceResult extends Base {
    athlete_id: number
    bib: string | null
    cat_rank: string | null
    category: string | null
    certificate: string | null
    chip_time: string | null
    course_id: number
    course_info: {
      course_name: string
      distance: string
      medal_url: string
      race_name: string
      route_image: null
      ticket_image: string
    }
    overall_rank: string | null
    name?: string | null
    gender?: string | null
    gun_time?: string | null
    laps: string | null
    gender_rank: string | null
    pace: string | null
    gap?: string | null
    race_id?: number | null
    match_status?: string | null
    created_on?: Date | string
    modified_on?: Date | string
    basic_athlete_info: {
      first_name: string | null
      last_name: string | null
      name: string | null
    } | null
  }

  interface AthleteResult extends Base {
    OverallRank: string
    Bib: string
    Name: string
    Gender: string
    ChipTime: string
    GunTime: string
    GenderRank: string
    CatRank: string
    Category: string
    Pace: string
    Gap: string
    Certificate: null
    Certi: string
    certificate_img_url
    Laps: {
      [key: string]: any
    }
  }

  interface Blogs extends Base {
    title: string
    meta_description: string
    author: string
    summary: string
    image: {
      src: string
      name: string
      width: number
      height: number
    }
  }
}
export declare namespace LocalData {
  interface Country {
    id: number
    code: string
    name: string
    region: string
    timezones: {
      [string]: [string]
    }
    iso: {
      'alpha-2': string
      'alpha-3': string
      numeric: string
    }
    phone: string[]
    emoji: string
    image: string
  }
}
