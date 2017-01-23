var request=require("request");

var base_url="http://localhost:3500";

describe("Testo l'invio",function(){
	describe("/invia",function(){
		it("returns status code 200",function(){
			var url=base_url+"/invia"; 
			request.get({url: url, form: {nome: Pippo, cognome: Inzaghi}},function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();		
		});
	});
});

