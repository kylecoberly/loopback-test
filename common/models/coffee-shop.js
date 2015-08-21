module.exports = function(CoffeeShop) {
    CoffeeShop.validatesPresenceOf('name', 'city');

    CoffeeShop.validatesLengthOf('name',{
        min: 5,
        max: 100,
        message: {
            min: 'Name is too short',
        max: 'Name is too long'
        }
    });
    CoffeeShop.validate('uniqueName', uniqueName, {
        message: 'Name not unique'
    });
    function uniqueName(errorCallback){
        /*
        CoffeeShop.find({"where": {"name": this.name}}, function(error, data){
            if (data.length){
                errorCallback();
            }
        });
        */
    }
    CoffeeShop.reviewCount = function(id, next){
        CoffeeShop.findById(id, {include: "reviews"}, function(error, data){
            var reviewCount = data.reviews.length;
            next(null, reviewCount);
        });
    };
    CoffeeShop.remoteMethod("reviewCount", {
        accepts: {
            arg: "id",
            type: "number"
        },
        returns: {
            arg: "reviewCount",
            type: "number"
        },
        http: [{
            verb: "get",
            path: "/reviewCount/:id"
        }]
    });

};
