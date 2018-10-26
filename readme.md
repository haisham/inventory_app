# FIFO inventory application
Author Haisham Saeed <br/>
using Angular6/PHP-Laravel <br/>
<b><a href="http://34.219.70.13/app/" target=_blank><b>Live demo</b></a></b>
<br/>
Server requirement:
PHP 7
Laravel 5.7<br/>
Nodejs CLI <br/>
NPM CLI<br/>

<h1>Setup API Server:</h1>
Laravel PHP framework<br/>
<b>Installation instructions:</b><br/>
Clone directory "backend" onto the server, 
update config/database.php with database authentication info<br/>
Run following commands using artisan console<br/>
php artisan migrate (this will create tables required in db)<br/>
php artisan clear-compiled<br/> 
composer dump-autoload<br/>
php artisan optimize<br/>
<br/>


<h1>Frontend (Angular 6):</h1>
<b>Installation instructions:</b><br/>
in nodejs cli run: 
npm install<br/>
ng serve

Nodejs CLI version 6.5.0 or up
Angular CLI 


<h1>Backend structure</h1>
Routes are defined in routes/web.php<br/>
Controller is defined in app/Http/Controllers/InventoryController.php<br/>

<h2>API calls</h2>

GET /inventory/{YYYY-mm-dd} : Retrieve all entries for the given date<br/>
POST /inventory : Post params: action = buy|sell, date = YYYY-mm-dd quantity = number unitPrice = float|int<br/>


<h1>Frontend app structure</h1>
App Component : app/public/frontend/src/app/app.component.ts<br/>
Services are added in Angular app/public/frontend/src/app/services/inventory.service.ts<br/>

<h1>Running PHPUnit tests</h1>
API tests are defined in backend/tests/Feature/ApiTest.php <br/>
To run tests, navigate to backend and run: <br/>
./vendor/bin/phpunit
