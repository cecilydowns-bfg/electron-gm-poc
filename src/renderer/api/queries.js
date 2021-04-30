import { gql } from '@apollo/client';

export const CUSTOMER_DETAILS = gql`
    query {
        customer {
            email
            firstname
            lastname
        }
        customerDownloadableProducts {
            items {
                date
                download_url
                order_increment_id
                remaining_downloads
                status
            }
        }
    }
`;

export const GENERATE_TOKEN = gql`
    mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export const PRODUCTS = gql`
    query {
        products(filter: { category_id: { eq: "2" } }) {
            items {
                __typename
                sku
                name
                game_id
                description {
                    html
                }
                image {
                    label
                    url
                }
                ... on ConfigurableProduct {
                    price_range {
                        maximum_price {
                            regular_price {
                                value
                                currency
                            }
                            final_price {
                                value
                                currency
                            }
                            discount {
                                amount_off
                                percent_off
                            }
                        }
                    }
                    configurable_options {
                        label
                        attribute_code
                        values {
                            value_index
                            label
                        }
                    }
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        product {
                            sku
                            name
                            description {
                                html
                            }
                            image {
                                label
                                url
                            }
                            thumbnail {
                                label
                                url
                            }
                            url_key
                            stock_status
                            color
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                        currency
                                    }
                                    final_price {
                                        value
                                        currency
                                    }
                                    discount {
                                        amount_off
                                        percent_off
                                    }
                                }
                            }
                            media_gallery {
                                __typename
                                disabled
                                url
                                label
                                position
                            }
                            architecture_custom_: architecture
                            bullet_1_custom_: bullet_1
                            bullet_2_custom_: bullet_2
                            bullet_3_custom_: bullet_3
                            bullet_4_custom_: bullet_4
                            bullet_5_custom_: bullet_5
                            file_size_custom_: file_size
                            game_id_custom_: game_id
                            genre_custom_: genre
                            image_460x230_url_custom_: image_460x230_url
                            image_feature_url_custom_: image_feature_url
                            screenshot_1_url_custom_: screenshot_1_url
                            screenshot_2_url_custom_: screenshot_2_url
                            screenshot_3_url_custom_: screenshot_3_url
                            image_80x80_url_custom_: image_80x80_url
                            is_big_fish_exclusive_custom_: is_big_fish_exclusive
                            is_collectors_edition_custom_: is_collectors_edition
                            is_tomorrows_game_today_custom_: is_tomorrows_game_today
                            platform_custom_: platform
                            preview_video_url_custom_: preview_video_url
                            sys_req_dx_custom_: sys_req_dx
                            sys_req_hd_custom_: sys_req_hd
                            sys_req_mem_custom_: sys_req_mem
                            sys_req_mhz_custom_: sys_req_mhz
                            sys_req_os_custom_: sys_req_os
                            sys_req_video_custom_: sys_req_video
                        }
                    }
                }
            }
        }
    }
`;
