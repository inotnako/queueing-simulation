package MongoTest;
use Mojo::Base 'Mojolicious';
use Mongoose;

sub startup 
	{
	my $self = shift;

	$self->attr
		(
		db => sub 
			{ 
			Mongoose->db
				(
				'smo'
				);
			}
		);
	$self->helper('db' => sub { shift->app->db });
	$self->db;

	my $r = $self->routes;
	$r->get('/')->to('example#welcome');
	$r->get('/connect')->to('example#connect');
	$r->get('/read')->to('example#read');
	$r->route('/update')->to('example#update');
	$r->route('/openid')->to('example#openid');
	$r->get('/users')->to('example#users');
	$r->get('/editor')->to('example#editor');
	$r->route('/get_users')->to('example#get_users');
	$r->route('/run_simulation')->to('example#run_simulation');
	$r->route('/create_model')->to('example#create_model');
	$r->route('/create_generator')->to('example#create_generator');
	$r->route('/create_server')->to('example#create_server');
	$r->route('/create_sink')->to('example#create_sink');
	$r->route('/create_queue')->to('example#create_queue');
}

1;
