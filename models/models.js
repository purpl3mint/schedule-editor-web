const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING, require: true},
  type: {type: DataTypes.STRING, require: true, defaultValue: 'user'}
}) 


//author_id: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
const CommonContent = sequelize.define('common_content', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, defaultValue: 'Без названия'},
  url: {type: DataTypes.STRING, require: true},
  online: {type: DataTypes.BOOLEAN, defaultValue: false},
  aspect_ratio: {type: DataTypes.STRING, defaultValue: 'normal'},
  duration: {type: DataTypes.INTEGER, defaultValue: 0}
}) 

//author_id: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
const Banner = sequelize.define('banner', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, defaultValue: 'Без названия'},
  url: {type: DataTypes.STRING, require: true},
  url_reserve: {type: DataTypes.STRING},
  online: {type: DataTypes.BOOLEAN, defaultValue: false},
  duration: {type: DataTypes.INTEGER, defaultValue: 0},
  background: {type: DataTypes.STRING, defaultValue: '#000000'},
  layout_width: {type: DataTypes.STRING, defaultValue: 'wrap_content'},
  layout_height: {type: DataTypes.STRING, defaultValue: 'wrap_content'},
  layout_gravity: {type: DataTypes.STRING},
})

//author_id: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
const Ticker = sequelize.define('ticker', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, require: true},
  url: {type: DataTypes.STRING, require: true},
  size: {type: DataTypes.INTEGER, require: true, defaultValue: 24},
  speed: {type: DataTypes.INTEGER, require: true, defaultValue: 80},
  font_color: {type: DataTypes.STRING, require: true, defaultValue: '#ffffff'},
  background_color: {type: DataTypes.STRING, require: true, defaultValue: '#000000'}
})

//content_id: {type: DataTypes.INTEGER, require: true},
//author_id: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
const Mediaplan = sequelize.define('mediaplan', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  ads_start_delay: {type: DataTypes.INTEGER},
  banners_start_delay: {type: DataTypes.INTEGER, defaultValue: 0},
  banners_repeat: {type: DataTypes.BOOLEAN, defaultValue: false},
  banners_animation_duration_msec: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Ads = sequelize.define('ads', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  position: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
  contentId: {type: DataTypes.INTEGER, require: true, unique: false},
  mediaplanId: {type: DataTypes.INTEGER, require: true, unique: false},
})

const BannerInMediaplan = sequelize.define('banner_in_mediaplan', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  position: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
  bannerId: {type: DataTypes.INTEGER, require: true},
  mediaplanId: {type: DataTypes.INTEGER, require: true},
})

User.hasMany(Banner)
Banner.belongsTo(User)

User.hasMany(Ticker)
Ticker.belongsTo(User)

User.hasMany(CommonContent)
CommonContent.belongsTo(User)

User.hasMany(Mediaplan)
Mediaplan.belongsTo(User)

CommonContent.hasMany(Mediaplan)
Mediaplan.belongsTo(CommonContent)

Ticker.hasMany(Mediaplan)
Mediaplan.belongsTo(Ticker)

Mediaplan.belongsToMany(CommonContent, { through: Ads, as: 'MediaplanContent', foreignKey: 'mediaplanId' } )
CommonContent.belongsToMany(Mediaplan, { through: Ads, as: 'Content', foreignKey: 'contentId' })


Mediaplan.belongsToMany(Banner, { through: BannerInMediaplan, as: 'MediaplanBanner', foreignKey: 'mediaplanId' })
Banner.belongsToMany(Mediaplan, { through: BannerInMediaplan, as: 'Banner', foreignKey: 'bannerId' })

module.exports = {
  User,
  CommonContent,
  Banner,
  Ticker,
  Mediaplan,
  BannerInMediaplan,
  Ads
}