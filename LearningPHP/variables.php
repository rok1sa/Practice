<?php
    // variable = a reusable container that holds data
    // string, integer, float, boolean
    
    //strings
    $user_name = "User123";
    $food = "pasta";
    $email = "example@gmail.com";

    //integers
    $age = 21;
    $users = 2;
    $quantity = 3;

    //floats
    $gpa = 2.5;
    $price = 9.99;
    $tax_rate = 5.1;

    //booleans
    $employed = true;
    $online = true;
    $for_sale = false;

    $total = null;

    echo "You have ordered {$quantity} x {$food}s <br>";
    $total = $quantity * $price;
    echo "Your total is: \${$total}<br>";



?>