const express = require('express');
const CertificatesService = require('../services/certicates');

const {
  certificateIdSchema,
  createCertificateSchema,
  updateCertificateSchema,
} = require('../utils/schemas/certificates');

const validationHandler = require('../utils/middlewares/validationHandler');

function certificatesApi(app) {
  const router = express.Router();
  app.use('/api/certificates', router);

  const certificatesService = new CertificatesService();

  router.get('/', async function (req, res, next) {
    let { data } = req.query;

    try {
      const message = await certificatesService.getCertificates({ data });

      res.status(200).json({
        data: message,
        message: 'certificates listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:certificateId',
    validationHandler({ certificateId: certificateIdSchema }, 'params'),
    async function (req, res, next) {
      const { certificateId } = req.params;

      try {
        const movies = await certificatesService.getCertificate({ certificateId });

        res.status(200).json({
          data: movies,
          message: 'certificates retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Create
  router.post('/', validationHandler(createCertificateSchema), async function (
    req,
    res,
    next
  ) {
    const { body: certificate } = req;

    try {
      const createCertificateId = await certificatesService.createCertificate({ certificate });

      res.status(201).json({
        data: createCertificateId,
        message: 'certificate created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:certificateId',
    validationHandler({ certificateId: certificateIdSchema }, 'params'),
    validationHandler(updateCertificateSchema),
    async function (req, res, next) {
      const { certificateId } = req.params;
      const { body: certificate } = req;

      try {
        const updateCertificateId = await certificatesService.updateCertificate({
          certificateId,
          certificate,
        });

        res.status(200).json({
          data: updateCertificateId,
          message: 'certificate updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:certificateId',
    validationHandler({ certificateId: certificateIdSchema }, 'params'),
    async function (req, res, next) {
      const { certificateId } = req.params;

      try {
        const deleteCertificateId = await certificatesService.deleteCertificate({ certificateId });

        res.status(200).json({
          data: deleteCertificateId,
          message: 'certificates deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = certificatesApi;
