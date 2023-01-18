const MongoLib = require('../lib/mongo')
const { v4: uuidV4 } = require('uuid');

class CertificatesService {
  constructor() {
    this.collection = 'certificates_v2';
    this.mongoDB = new MongoLib();
  }

  async getCertificates({ data = '' }) {
    const query = data && { $or:[{dni: data}, { email: data }] };
    const certificates = await this.mongoDB.getAll(this.collection, query);
    return certificates || [];
  }

  async getCertificate({ certificateId }) {
    const certificate = await this.mongoDB.get(this.collection, certificateId);

    const videos = await this.mongoDB.get(this.collection, certificate.course_id).parent

    return certificate || {};
  }

  async createCertificate({ certificate }) {
    const { videos } = certificate;
    if (videos.length > 0) {
      certificate.videos = await this.addTokensInVideos(videos);
    }

    if (certificate.hasOwnProperty('promotions')) {
      const { promotions } = certificate;
      certificate.promotions = await this.addTokensInVideos(promotions, true);
    }

    return await this.mongoDB.create(this.collection, certificate);
  }

  async updateCertificate({ certificateId, certificate }) {
    const { videos } = certificate;
    certificate.videos = await this.addTokensInVideos(videos);

    return await this.mongoDB.update(this.collection, certificateId, certificate);
  }

  async deleteCertificate({ certificateId }) {
    return await this.mongoDB.delete(this.collection, certificateId);
  }

  async addTokensInVideos(videos, isPromotion = false) {
    await videos.map((v) => {
      if (!v.hasOwnProperty('token')) {
        v.token = uuidV4();
      }
      return v;
    });

    return videos;
  }

}

module.exports = CertificatesService;
