package MongoTest::Example;
use Mojo::Base 'Mojolicious::Controller';
use MongoDB::OID;
use OpenID::Login;
use Data::Dump qw(dump);
use Simulation::DiscreteEvent;

use User;

# This action will render a template
sub welcome {
  my $self = shift;

  # Render template "example/welcome.html.ep" with message
  $self->render(
    message => 'Welcome to the Mojolicious real-time web framework!');
}

=pod
sub connect
	{
	my $self = shift;
	my $conn = $self->db;
	$conn->connect;
	$conn->authenticate('smo', 'manager', 'manAger#WQ720');
	my $db = $conn->smo;
	my $users = $db->users;
	my $data = $users->find;
	$self->render
		(
		json => 
			{
			users => 
				[
				map {$_,} $data->next
				]
			}
		);
	}


sub update
	{
	my $self = shift;
	my $params = $self->req->json;

	if (ref($params) eq 'HASH')
		{
		my $update =$self->db->smo->users->update
			(
				{ "_id" => MongoDB::OID->new(value => $params->{_id})},
				{'$set' =>
					{
					lastname => $params->{lastname},
					firstname => $params->{firstname},
					login => $params->{login},
					pass => $params->{pass},
					country => $params->{country},
					sity => $params->{sity},
					email => $params->{email},
					birthday => $params->{birthday},
					gender => $params->{gender},
					type => $params->{type},
					age => $params->{age},
					}
				}
			);
		if ($update)
			{
			return $self->render
				(
				json =>
					{
					success => Mojo::JSON->true,
					msg => 'OK',
					params => dump ($params),
					}
				);
			}
		}
	return $self->render
		(
		json =>
			{
			success => Mojo::JSON->false,
			msg => 'Failure',
			params => $params,
			}
		);
	}
=cut	
sub login
	{
	my $self = shift;
	my $params = $self->req->json;
	
	}

sub users
	{
	my $self = shift;
	$self->render
		(
		'simple/simple',
		controllers => '"Users"',
		views => '"userlist"',
		);
	}

sub read
	{
	my $self = shift;
	$self->render
		(
		json => 
			{
			users => 
				[
					{
					id 		=> User->find->next->_id,
					lastname  	=> User->find->next->lastname,
					firstname  	=> User->find->next->firstname,
					type		=> User->find->next->type,
					username  	=> User->find->next->username,
					password  	=> User->find->next->username,
					email 		=> User->find->next->email,
					country 	=> User->find->next->country,
					sity  		=> User->find->next->sity,
					gender 		=> User->find->next->gender,
					age  		=> User->find->next->age,
					birthday 	=> User->find->next->birthday,
					}
				]
			}
		);
	}

sub get_users
	{
	my $self = shift;
	$self->render
		(
		json => 
			{
			users => 
				[
				map {$_,} dump User->find->next
				]
			}
		);
	}

sub editor
	{
	my $self = shift;
	$self->render
		(
		'raphael/index',
		controllers => '"Maker"',
		);
	}

sub create_model
	{
	my $self = shift;
	my $model = Simulation::DiscreteEvent->new;
	$self->app->helper(model => sub {return $model;});
	$self->render
		(
		json =>
			{
			success => Mojo::JSON->true,
			msg => 'Ok',
			}
		);
	}

sub create_generator
	{
	my $self = shift;
	my $gen = $self->model->add('Generator');
	$self->app->helper(gen => sub { return $gen;});
	$self->render
		(
		json =>
			{
			success => Mojo::JSON->true,
			msg => 'Ok',
			}
		);
	}

sub create_server
	{
	my $self = shift;
	#my $params = $self->req->json->server;
	my $server = $self->model->add
		(
		'CallCenter',
		mu       => 3.5, # $params->mu
		sigma    => 1, 	#  $params->sigma
		channels => 50,#   $params->channels
		);
	$self->app->helper('ser' => sub {$server});
	$self->render
		(
		json =>
			{
			success => Mojo::JSON->true,
			msg => 'Ok',
			}
		);
	}

sub create_queue
	{

	}

sub create_sink
	{
	my $self = shift;
	my $sink = $self->model->add('Sink');
	$self->app->helper(sink => sub { $sink } );	
	$self->render
		(
		json =>
			{
			success => Mojo::JSON->true,
			msg => 'Ok',
			}
		);
	}

sub run_simulation
	{
	my $self = shift;
	
#connect
	$self->gen->dest($self->ser);
	$self->ser->dest($self->sink);
	
# run simulation
	$self->model->send( $self->gen, 'next' );
	$self->model->run(1000);
	
# these functions are provided by S::DE::Recorder
	my $served   = $self->sink->get_number_of('served');
	my $rejected = $self->sink->get_number_of('rejected');
       
	$self->render
		(
		json =>
			{
			success => Mojo::JSON->true,
			model_time => $self->model->time,
			calls_total => $served + $rejected,
			served => $served,
			rejected => $rejected,
			average_load => $self->ser->average_load,
			}
		);
	}

sub auth
	{
	my $self = shift;
	
	}
	
sub register
	{
	my $self = shift;
	
	}
1;
