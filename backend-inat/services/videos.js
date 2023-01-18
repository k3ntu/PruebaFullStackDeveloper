const MongoLib = require('../lib/mongo')

class VideosService {
  constructor() {
    this.collection = 'videos';
    this.mongoDB = new MongoLib();
  }

  async getVideos({ theme = '' }) {
    const query = theme && { theme_id: theme };
    const videos = await this.mongoDB.getAll(this.collection, query);
    return videos || [];
  }

  async getVideo({ videoId }) {
    const video = await this.mongoDB.get(this.collection, videoId);
    return video || {};
  }

  async createVideo({ video }) {
    return await this.mongoDB.create(this.collection, video);
  }

  async updateVideo({ videoId, video }) {
    return await this.mongoDB.update(this.collection, videoId, video);
  }

  async deleteVideo({ videoId }) {
    return await this.mongoDB.delete(this.collection, videoId);
  }

}

module.exports = VideosService;
