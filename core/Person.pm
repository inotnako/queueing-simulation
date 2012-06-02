package Person;

use Moose;

has 'firstname' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'lastname' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'country' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'sity' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

has 'age' => 
	(
	is  => 'rw',
	isa => 'Int',
	);

has 'gender' => 
	(
	is  => 'rw',
	isa => 'Str',
	);
has 'birthday' => 
	(
	is  => 'rw',
	isa => 'Str',
	);

no Moose;
__PACKAGE__->meta->make_immutable;