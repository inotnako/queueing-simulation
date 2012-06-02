package User;

use Moose;
use DateTime;
with 'Mongoose::Document'=> 
	{
	-collection_name => 'users'   
	};

extends 'Person';

has 'password' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'username' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'email' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'type' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

no Moose;
__PACKAGE__->meta->make_immutable;