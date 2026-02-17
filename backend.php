<?php
    $serverName = "localhost";
    $username = "root";
    $password = "";

    //create connection
    $conn = mysqli_connect($serverName, $username, $password);

    //the following will be used to check the connection to the database
    if ($conn -> connect_error){
        die("Connection failed: " . $conn -> connect_error);
    }


    //the following will be used to create a database for the listings
    