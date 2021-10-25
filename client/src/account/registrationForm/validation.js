//Implementation of the function to check the integrity

import React from 'react'

export default function validation(value, type) {

    //Checking the first name:
    if (type == "fname") {

        //Check that the first name field is full
        if (!value) {
            return("First Name cannot be empty");
           
        }

        //Checking the integrity of the first name 
        if (!value.match(/^[a-zA-Z ]+$/)) {
            return("First Name has to be with just letters")
           
        }
    }

    //Checking the last name:
    if (type == "lname") {

        //Check that the last name field is full
        if (!value) {
            return("Last Name cannot be empty");
            
        }

        //Checking the integrity of the last name  
        if (!value.match(/^[a-zA-Z]+$/)) {
            return("Last Name has to be with just letters")
            
        }
    }

    //Checking the age:
    if (type == "age") {

        //Check that the age field is full
        if (!value) {
            return("Age cannot be empty");
             
        }

        //Checking the integrity of the age
        if (!(value > 2 && value < 120)) {
            return("Age is not correct")
            
        }
    }

    //Checking the email:
    if (type == "email") {
        //Check that the email field is full
        if (!(value)) {
            return ("Email canot be empty")
        }
        //Checking the integrity of the email
        if (value) {
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 &&
                lastDotPos > 2 && value.length - lastDotPos > 2)) {
                return ("Email is not valid")
            }
        }
    }

    //Checking the password:
    if (type == "password") {
        //Check that the password field is full
        if (!(value)) {
            return("Password canot be empty")
            
        }
        //Checking the integrity of the email
        if (value.length>20) {
         {
                return("Password must have at most 20 characters")
                
            }
        }
    }


    //Checking the phone:
    if (type == "phone") {

        //Check that the phone field is full
        if (!(value)) {
            return("Phone canot be empty")
            
        }

        //Checking the integrity of the phone
        if (!(value.length >= 9 && value.length <= 10 && value[0]==0)) {
            return("Phone is not valid")
            
        }
    }
 //Checking the address:
    if (type == "address") {

        if (!(value)) {
            return("Address canot be empty")
          
        }
    }
     //Checking the city:
    if (type == "city") {

        if (!(value)) {
            return("City canot be empty")
         
        }
    }
     //Checking the postalCode:
    if (type == "postalCode") {

        if (!(value)) {
            return("Postal Code canot be empty")
        }

        if (!(value.length >= 5 && value.length <= 8)) {
            return("Postal Code is not valid")
        }
    }






    //Arraving here if the all tests have been passed successfully


    return null
    
}
