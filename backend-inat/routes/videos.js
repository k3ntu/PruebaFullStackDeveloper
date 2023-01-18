const express = require('express');
const VideosService = require('../services/videos');

const {
  videoIdSchema,
  createVideoSchema,
  updateVideoSchema,
} = require('../utils/schemas/videos');

const validationHandler = require('../utils/middlewares/validationHandler');

function videosApi(app) {
  const router = express.Router();
  app.use('/api/videos', router);

  const videosService = new VideosService();

  router.get('/', async function (req, res, next) {
    let { theme } = req.query;

    try {
      const videos = await videosService.getVideos({ theme });

      res.status(200).json({
        data: videos,
        message: 'videos listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:videoId',
    validationHandler({ videoId: videoIdSchema }, 'params'),
    async function (req, res, next) {
      const { videoId } = req.params;

      try {
        const videos = await videosService.getVideo({ videoId });

        res.status(200).json({
          data: videos,
          message: 'video retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Create
  router.post('/', validationHandler(createVideoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: video } = req;

    try {
      const createVideoId = await videosService.createVideo({ video });

      res.status(201).json({
        data: createVideoId,
        message: 'video created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:themeId',
    validationHandler({ videoId: videoIdSchema }, 'params'),
    validationHandler(updateVideoSchema),
    async function (req, res, next) {
      const { videoId } = req.params;
      const { body: video } = req;

      try {
        const updateVideoId = await videosService.updateVideo({
          videoId,
          video,
        });

        res.status(200).json({
          data: updateVideoId,
          message: 'video updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:videoId',
    validationHandler({ videoId: videoIdSchema }, 'params'),
    async function (req, res, next) {
      const { videoId } = req.params;

      try {
        const deleteVideoId = await videosService.deleteVideo({ videoId });

        res.status(200).json({
          data: deleteVideoId,
          message: 'video deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = videosApi;
