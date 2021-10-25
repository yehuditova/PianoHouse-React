import { CreateItem, createUser } from "./server"
const items=[
    {
      "id": 11,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/11.jpg",
      "barcode": 98091
    },
    {
      "id": 12,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/12.jpg",
      "barcode": 98092
    },
    {
      "id": 13,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/13.jpg",
      "barcode": 98093
    },
    {
      "id": 14,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/14.jpg",
      "barcode": 98094
    },
    {
      "id": 15,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/15.jpg",
      "barcode": 98095
    },
    {
      "id": 16,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/16.jpg",
      "barcode": 98096
    },
    {
      "id": 17,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/17.jpg",
      "barcode": 98097
    },
    {
      "id": 18,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/18.jpg",
      "barcode": 98098
    },
    {
      "id": 1,
      "company": "petrof",
      "color": "black",
      "price": 3500,
      "image": "./pianoimages/1.jpg",
      "barcode": 98099
    },
    {
      "id": 2,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/2.jpg",
      "barcode": 98001
    },
    {
      "id": 3,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/3.jpg",
      "barcode": 98002
    },
    {
      "id": 4,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/4.jpg",
      "barcode": 98003
    },
    {
      "id": 5,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/5.jpg",
      "barcode": 98004
    },
    {
      "id": 6,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/6.jpg",
      "barcode": 98005
    },
    {
      "id": 7,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/7.jpg",
      "barcode": 98006
    },
    {
      "id": 8,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/8.jpg",
      "barcode": 98007
    },
    {
      "id": 9,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/9.jpg",
      "barcode": 98008
    },
    {
      "id": 10,
      "company": "petrof",
      "color": "black",
      "price": 3500,
      "image": "./pianoimages/10.jpg",
      "barcode": 98009
    },
    {
      "id": 19,
      "company": "petrof",
      "color": "black",
      "price": 3500,
      "image": "./pianoimages/19.jpg",
      "barcode": 98019
    },
    {
      "id": 20,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/2.jpg",
      "barcode": 98020
    },
    {
      "id": 21,
      "company": "cassio",
      "color": "brown",
      "price": 500,
      "image": "./pianoimages/21.jpg",
      "barcode": 98021
    },
    {
      "id": 22,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/22.jpg",
      "barcode": 98022
    },
    {
      "id": 23,
      "company": "korg",
      "color": "white",
      "price": 1800,
      "image": "./pianoimages/23.jpg",
      "barcode": 98023
    },
    {
      "id": 24,
      "company": "yamha",
      "color": "white",
      "price": 3000,
      "image": "./pianoimages/24.jpg",
      "barcode": 98024
    }
  ]

export function initialDB(){
  items.map((item)=>CreateItem(item))
  createUser({"fname":"My Account","email":"our","password":"our"})
}
  
