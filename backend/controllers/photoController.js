var PhotoModel = require('../models/photoModel.js');
var UserModel = require('../models/userModel.js');
const axios = require("axios");

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
            .populate('postedBy')
            .populate({
                path: 'comments',
                populate: {path: 'userId'}
            })
            .populate("likedBy")
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    },
    like: function (req, res) {
        var photoId = req.params.photoId;
        var userId = req.session.userId;
        PhotoModel.findByIdAndUpdate(photoId, {$addToSet: {likedBy: userId}}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: "Error when updating post.",
                    error: err
                });
            }
            axios.get('http://localhost:3001/photos/' + photo._id)
                .then(response => {
                    return res.json(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        });

    },
    report: function (req, res) {
        var photoId = req.params.photoId;
        var userId = req.session.userId;
        PhotoModel.findByIdAndUpdate(photoId, {$addToSet: {reports: userId}}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: "Error when updating post.",
                    error: err
                });
            }
            axios.get('http://localhost:3001/photos/' + photo._id)
                .then(response => {
                    return res.json(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        });

    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate('postedBy')
            .populate({
                path: 'comments',
                populate: {path: 'userId'}
            })
            .populate("likedBy")
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }

                return res.json(photo);
            });
    }
    ,

    /**
     * photoController.create()
     */
    create: function (req, res) {
        myTags = req.body.tags.split(" ");
        var photo = new PhotoModel({
            name: req.body.name,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: 0,
            comments: [],
            created: Date.now(),
            tags: myTags,
            reports: []
        });
        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }
            UserModel.findByIdAndUpdate(req.session.userId,
                {$push: {photos: photo._id}}).exec(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating photo',
                        error: err
                    });
                }
                return res.status(201).json(photo);
            });
            //return res.redirect('/photos');
        });
    }
    ,

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.views = req.body.views ? req.body.views : photo.views;
            photo.likes = req.body.likes ? req.body.likes : photo.likes;


            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    }
    ,

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
    ,

    publish: function (req, res) {
        return res.render('photo/publish');
    }
};
