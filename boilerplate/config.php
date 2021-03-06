<?php

$config = array(
	// Define your envrionments, name => hostname or IP
	'environments' => array(
		'local'       => '127.0.0.1',
		'staging'     => 'dev.mysite.com',
		'production'  => 'www.mysite.com',
	),

	// PHP configuration options
	'php' => array(
		'display_error'   => true,
		'error_reporting' => -1,
		'date.timezone'   => 'America/New_York',
	),

	// PICKLES configuration options
	'pickles' => array(
		// Disable with a "site down" message
		'disabled'        => false,
		// Use sessions
		'session'         => true,
		// Force HTTPS
		'secure'          => false,
		// Name of the parent template
		'template'        => 'index',
		// Name of the default module
		'module'          => 'home',
		// Name of the module to serve on 404 errors
		'404'             => 404,
		// Default datasource
		'datasource'      => 'mysql',
		// Whether or not you want to use the profiler
		'profiler'        => array(
			'local'      => true,
			'staging'    => false,
			'production' => false,
		),
	),

	// Datasources, keys are what's referenced in your models
	'datasources' => array(
		'mysql' => array(
			'driver'   => 'pdo_mysql',
			'hostname' => 'localhost',
			'username' => 'root',
			'password' => '',
			'database' => 'test'
		),
	),

	// Security configuration
	'security' => array(
		// Login page
		'login'  => 'login',
		// Your user table
		'model'  => 'User',
		// The column you use to specify the user role
		'column' => 'access_level',
		// The available levels (roles)
		'levels' => array(
			10 => 'USER',
			20 => 'ADMIN',
		),
	),

	// Anything can be defined
	'stuff' => array(
		'foo'  => 'bar',
		'spam' => 'eggs',
		// and can be broken out by environment
		'bacon' => array(
			'local'      => true,
			'staging'    => true,
			'production' => false
		)
	)
);

?>
