/* eslint-disable no-await-in-loop */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const argon = require("argon2");
// Load environment variables from .env file
require("dotenv").config();
// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");
// Import database client
const database = require("./database/client");

const env = process.env.APP_ENV;
const prodURL = "https://origindigital.creativebrain.fr/api";

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];
    /* ************************************************************************* */
    // Generating Seed Data
    // Optional: Truncate tables (remove existing data)
    await database.query("SET foreign_key_checks = 0");
    await database.query("truncate add_tags");
    await database.query("truncate favorites");
    await database.query("truncate likes");
    await database.query("truncate subscribe");
    await database.query("truncate upload");
    await database.query("truncate views");
    await database.query("truncate comments");
    await database.query("truncate videos");
    await database.query("truncate categories");
    await database.query("truncate users");
    await database.query("truncate tags");
    await database.query("SET foreign_key_checks = 1");
    const videos = [
      {
        title: "L'Ecole du cirque ",
        description: "Petit cours de voltige .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707359636860.0.952336222088096.1706026627893.0.6409657439334755.VID-20231009-WA0012_1.mp4`
            : "http://localhost:3310/upload/1707359636860.0.952336222088096.1706026627893.0.6409657439334755.VID-20231009-WA0012_1.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707359636935.0.6730664215720279.1706027393002.0.004230725508433952.20231009_193616.jpg`
            : "http://localhost:3310/upload/1707359636935.0.6730664215720279.1706027393002.0.004230725508433952.20231009_193616.jpg",
        date_publication: "2024-02-08 03:33:56",
        validate: 0,
        category_id: 9,
        user_id: 3,
      },
      {
        title: "Aux pays des Elephants",
        description: "Découvrez l'incroyable vie des Eléphants .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707360112082.0.8185203495005728.1707293951401.0.03207533434012211.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707360112082.0.8185203495005728.1707293951401.0.03207533434012211.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707360112393.0.3465145489759982.pexels-future-kiiid-3739327.jpg`
            : "http://localhost:3310/upload/1707360112393.0.3465145489759982.pexels-future-kiiid-3739327.jpg",
        date_publication: "2024-02-08 03:41:52",
        validate: 0,
        category_id: 5,
        user_id: 3,
      },
      {
        title: "Les meilleurs Burger de Paris",
        description: "A la recherche du meilleur burger de Paris .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707360343278.0.2537492863705497.pexels-sharon-mccutcheon-5997214 (1080p).mp4`
            : "http://localhost:3310/upload/1707360343278.0.2537492863705497.pexels-sharon-mccutcheon-5997214 (1080p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707360343673.0.6382042571469275.pexels-robin-stickel-70497.jpg`
            : "http://localhost:3310/upload/1707360343673.0.6382042571469275.pexels-robin-stickel-70497.jpg",
        date_publication: "2024-02-08 03:45:43",
        validate: 0,
        category_id: 4,
        user_id: 3,
      },
      {
        title: "Tuto cuisine",
        description: "Suivez nos Tutos pour découvrir d'incroyable recette .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707360469460.0.5794256291149025.production_id_4912727 (2160p).mp4`
            : "http://localhost:3310/upload/1707360469460.0.5794256291149025.production_id_4912727 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707360470162.0.15007949684492305.Design sans titre (1).png`
            : "http://localhost:3310/upload/1707360470162.0.15007949684492305.Design sans titre (1).png",
        date_publication: "2024-02-06 12:30:41",
        validate: 0,
        category_id: 4,
        user_id: 3,
      },
      {
        title: "Helico Miami (survol)",
        description: "Survol de Miami en Hélico !",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707360865941.0.4699726043737533.pexels-kampus-production-7963314 (2160p).mp4`
            : "http://localhost:3310/upload/1707360865941.0.4699726043737533.pexels-kampus-production-7963314 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707360866321.0.30406084510054643.pexels-eray-altay-3834331.jpg`
            : "http://localhost:3310/upload/1707360866321.0.30406084510054643.pexels-eray-altay-3834331.jpg",
        date_publication: "2024-02-08 03:54:26",
        validate: 0,
        category_id: 8,
        user_id: 3,
      },
      {
        title: "Street Art (Paris)",
        description: "Plongez dans l'univers du street art parisien .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707361176135.0.8635431638507329.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707361176135.0.8635431638507329.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707361176302.0.7305201422295404.pexels-jeswin-thomas-1656059.jpg`
            : "http://localhost:3310/upload/1707361176302.0.7305201422295404.pexels-jeswin-thomas-1656059.jpg",
        date_publication: "2024-02-08 03:59:36",
        validate: 0,
        category_id: 2,
        user_id: 3,
      },
      {
        title: "Devenir Dev en 2024",
        description:
          "Nos meilleurs conseils pour devenir Web développeur en 2024 ",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707361369568.0.8932527329574558.20240202_144630.mp4`
            : "http://localhost:3310/upload/1707361369568.0.8932527329574558.20240202_144630.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707361369751.0.4571663325886963.pexels-thisisengineering-3861972.jpg`
            : "http://localhost:3310/upload/1707361369751.0.4571663325886963.pexels-thisisengineering-3861972.jpg",
        date_publication: "2024-02-08 04:02:49",
        validate: 0,
        category_id: 7,
        user_id: 3,
      },
      {
        title: "Le plus redoutable des prédateurs.",
        description: "Découvrez le léopard cet incroyable prédateurs .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707361649184.0.3504395543351706.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707361649184.0.3504395543351706.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707361649588.0.8599991069734565.pexels-harvey-sapir-1109907.jpg`
            : "http://localhost:3310/upload/1707361649588.0.8599991069734565.pexels-harvey-sapir-1109907.jpg",
        date_publication: "2024-02-08 04:07:29",
        validate: 0,
        category_id: 5,
        user_id: 3,
      },
      {
        title: "Mexico Art !",
        description: "Découvrez l'art contemporain mexicain .",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707361865863.0.027991338196225124.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707361865863.0.027991338196225124.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707361866020.0.6233250891105715.pexels-chait-goli-1918290.jpg`
            : "http://localhost:3310/upload/1707361866020.0.6233250891105715.pexels-chait-goli-1918290.jpg",
        date_publication: "2024-02-06 15:00:57",
        validate: 0,
        category_id: 2,
        user_id: 3,
      },
      {
        title: "A la découvert du Désert",
        description: "Plongez dans le Sahara et ses milles et un secrets.",
        URL_video:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707362035497.0.4168126559257832.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707362035497.0.4168126559257832.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707362035650.0.7856865515879332.desert-2095287_1280.jpg`
            : "http://localhost:3310/upload/1707362035650.0.7856865515879332.desert-2095287_1280.jpg",
        date_publication: "2024-02-06 15:00:57",
        validate: 0,
        category_id: 6,
        user_id: 3,
      },
      {
        title: "Tuto dessin !",
        description: "Apprenez a dessiner avec nos tutos simple.",
        URL_video:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707362197474.0.2699797121944887.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707362197474.0.2699797121944887.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707362197631.0.8372168352356453.art-1851483_1280.jpg`
            : "http://localhost:3310/upload/1707362197631.0.8372168352356453.art-1851483_1280.jpg",
        date_publication: "2024-02-06 16:53:50",
        validate: 0,
        category_id: 2,
        user_id: 3,
      },
      {
        title: "Sur le toit du monde(Everest)",
        description: "A 8849m découvrez l'ascension du toit du monde. ",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707362447214.0.027946136327337667.pexels-artem-podrez-7049216 (2160p).mp4`
            : "http://localhost:3310/upload/1707362447214.0.027946136327337667.pexels-artem-podrez-7049216 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707362447367.0.5052204573285477.nepal-4710522_1280.jpg`
            : "http://localhost:3310/upload/1707362447367.0.5052204573285477.nepal-4710522_1280.jpg",
        date_publication: "2024-02-06 16:53:50",
        validate: 0,
        category_id: 8,
        user_id: 4,
      },
      {
        title: "Arsenal saison 2022/2023",
        description: "Revivez la saison 2022/2023 des gunners.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707362621244.0.2908583272206795.20240202_144030.mp4`
            : "http://localhost:3310/upload/1707362621244.0.2908583272206795.20240202_144030.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707362621309.0.884325533516584.pexels-tembela-bohle-1884574.jpg`
            : "http://localhost:3310/upload/1707362621309.0.884325533516584.pexels-tembela-bohle-1884574.jpg",
        date_publication: "2024-02-06 16:53:50",
        validate: 0,
        category_id: 9,
        user_id: 4,
      },
      {
        title: "La muraille de Chine.",
        description: "Découvrez la muraille de Chine et son histoire.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707362794401.0.5399575082639829.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707362794401.0.5399575082639829.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707362794473.0.7395924080612823.pexels-paulo-marcelo-martins-2412603.jpg`
            : "http://localhost:3310/upload/1707362794473.0.7395924080612823.pexels-paulo-marcelo-martins-2412603.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 8,
        user_id: 4,
      },
      {
        title: "Dans l'univers des Orques",
        description: "Découvrez ce fascinant animal qu'est l'Orque.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707362993603.0.32127519399946447.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707362993603.0.32127519399946447.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707362993678.0.868858758868325.pexels-andre-estevez-3325908.jpg`
            : "http://localhost:3310/upload/1707362993678.0.868858758868325.pexels-andre-estevez-3325908.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 5,
        user_id: 4,
      },
      {
        title: "24h au Louvre",
        description: "Visite au Louvre pour y découvrir tous ses secrets.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707363189581.0.18816395489514393.pexels-una-laurencic-20967.jpg`
            : "http://localhost:3310/upload/1707363189581.0.18816395489514393.pexels-una-laurencic-20967.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 2,
        user_id: 4,
      },
      {
        title: "Découverte de la Nouvelle-Zélande",
        description: "Voyage somptueux au cœur de la Nouvelle-Zélande.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}upload/1707363804610.0.8700192328168199.pexels-gaetan-thurin-3163927.jpg`
            : "http://localhost:3310/upload/1707363804610.0.8700192328168199.pexels-gaetan-thurin-3163927.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 8,
        user_id: 4,
      },
      {
        title: "Le Métaverse notre futur ?",
        description: "Reportage sur la technologie de réalité virtuelle.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707363986855.0.8389232536454703.pexels-harsch-shivam-2007647 (1).jpg`
            : "http://localhost:3310/upload/1707363986855.0.8389232536454703.pexels-harsch-shivam-2007647 (1).jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 7,
        user_id: 4,
      },
      {
        title: "La guerre du Dollar ",
        description: "Le dollar et son influence sur le monde.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707364146990.0.15068434684696141.arm-wrestling-567950_1280.jpg`
            : "http://localhost:3310/upload/1707364146990.0.15068434684696141.arm-wrestling-567950_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 3,
        user_id: 4,
      },
      {
        title: "Découvrez la Polynésie Française(Tahiti)",
        description:
          "Découvrez les magnifiques paysages de la Polynésie Française.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707364335379.0.43700919947093464.pexels-julius-silver-753626.jpg`
            : "http://localhost:3310/upload/1707364335379.0.43700919947093464.pexels-julius-silver-753626.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 8,
        user_id: 4,
      },
      {
        title: "Les grands moments du tennis",
        description:
          "Revivez les moments des matchs les plus marquants du tennis.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707364501499.0.8196638373707361.pexels-todd-trapani-2339377.jpg`
            : "http://localhost:3310/upload/1707364501499.0.8196638373707361.pexels-todd-trapani-2339377.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 9,
        user_id: 4,
      },
      {
        title: "Au cœur de L'Amazonie ",
        description: "Voyage au cœur de la foret Amazonienne ",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707364651416.0.8028145813588028.amazonia-5406522_1280.jpg`
            : "http://localhost:3310/upload/1707364651416.0.8028145813588028.amazonia-5406522_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 6,
        user_id: 4,
      },
      {
        title: "Epargnez en 2024 ?",
        description: "Nos meilleurs astuces pour bien investir en 2024.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707363189514.0.46826704891611537.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707363189514.0.46826704891611537.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707364872975.0.32014177594130744.money-2724241_1280.jpg`
            : "http://localhost:3310/upload/1707364872975.0.32014177594130744.money-2724241_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 3,
        user_id: 2,
      },
      {
        title: "Le pain comme a la boulangerie",
        description:
          "Faite votre pain comme a la boulangerie en suivant notre tuto.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707365049405.0.02226864871914458.20240202_144030.mp4`
            : "http://localhost:3310/upload/1707365049405.0.02226864871914458.20240202_144030.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707365049484.0.5102154782956838.pexels-malidate-van-784633.jpg`
            : "http://localhost:3310/upload/1707365049484.0.5102154782956838.pexels-malidate-van-784633.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 4,
        user_id: 2,
      },
      {
        title: "L'entreprenariat en 2024 ",
        description: "Nos meilleurs conseils pour entreprendre en 2024.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707365243178.0.775616168192903.20240202_144030.mp4`
            : "http://localhost:3310/upload/1707365243178.0.775616168192903.20240202_144030.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707365243252.0.7667403459315525.entrepreneur-1340649_1280.jpg`
            : "http://localhost:3310/upload/1707365243252.0.7667403459315525.entrepreneur-1340649_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 3,
        user_id: 2,
      },
      {
        title: "Apprendre a dessiner",
        description: "Tuto pour découvrir le dessin de manière originale.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707365412891.0.15994605727050626.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707365412891.0.15994605727050626.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707365412955.0.025391160198631857.pexels-gÃ¼l-iÅÄ±k-3246665.jpg`
            : "http://localhost:3310/upload/1707365412955.0.025391160198631857.pexels-gÃ¼l-iÅÄ±k-3246665.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 2,
        user_id: 2,
      },
      {
        title: "L'histoire du Basket-Ball",
        description: "Plongez dans l'histoire du Basket-Ball.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707365412891.0.15994605727050626.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707365412891.0.15994605727050626.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707365609199.0.6466409522916527.pexels-wallace-chuck-2834918.jpg`
            : "http://localhost:3310/upload/1707365609199.0.6466409522916527.pexels-wallace-chuck-2834918.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 9,
        user_id: 2,
      },
      {
        title: "Voyage au Japon",
        description: "Découvrez le pays du soleil levant.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707365797811.0.6964104933231612.20240202_144445.mp4`
            : "http://localhost:3310/upload/1707365797811.0.6964104933231612.20240202_144445.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707365797846.0.0502186266730138.pexels-dsd-1829980.jpg`
            : "http://localhost:3310/upload/1707365797846.0.0502186266730138.pexels-dsd-1829980.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 8,
        user_id: 2,
      },
      {
        title: "L'histoire de la tour Eiffel",
        description:
          "Découvrez l'histoire du monument le plus visité au monde.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366079089.0.5290949755606553.pexels-kampus-production-7963314 (2160p).mp4`
            : "http://localhost:3310/upload/1707366079089.0.5290949755606553.pexels-kampus-production-7963314 (2160p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707366079248.0.6605320724672206.eiffel-tower-3349075_1280.jpg`
            : "http://localhost:3310/upload/1707366079248.0.6605320724672206.eiffel-tower-3349075_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 1,
        user_id: 2,
      },
      {
        title: "Le plus haut building du monde(827m)",
        description: "Découvrez l'histoire du Burj Khalifa.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366260733.0.6662148386637785.20240202_144630.mp4`
            : "http://localhost:3310/upload/1707366260733.0.6662148386637785.20240202_144630.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}http://localhost:3310/upload/1707366260798.0.8567818118442188.dubai-2057583_1280.jpg`
            : "http://localhost:3310/upload/1707366260798.0.8567818118442188.dubai-2057583_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 1,
        user_id: 2,
      },
      {
        title: "La hype de l'E-sport",
        description: "Reportage sur l'ascension de l'E-sport.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366492652.0.09959999332522562.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707366492652.0.09959999332522562.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707366492725.0.5123001247871382.pexels-yan-krukau-9071739.jpg`
            : "http://localhost:3310/upload/1707366492725.0.5123001247871382.pexels-yan-krukau-9071739.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 9,
        user_id: 2,
      },
      {
        title: "Les chutes du Niagara",
        description: "Découvrez les plus hautes chutes du Monde.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366492652.0.09959999332522562.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707366492652.0.09959999332522562.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707366731680.0.5455418311565172.niagara-falls-2186816_1280.jpg`
            : "http://localhost:3310/upload/1707366731680.0.5455418311565172.niagara-falls-2186816_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 6,
        user_id: 2,
      },
      {
        title: "L'avenir de l'intelligence artificielle",
        description: "Reportage sur la folle évolution de L'IA.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366492652.0.09959999332522562.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707366492652.0.09959999332522562.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707367011929.0.21333092692104105.digital-art-8420361_1280.jpg`
            : "http://localhost:3310/upload/1707367011929.0.21333092692104105.digital-art-8420361_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 7,
        user_id: 2,
      },
      {
        title: "L'histoire du Golden Gate",
        description: "Revivez la construction de cet emblématique édifice. ",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707367308930.0.7850948621355036.20240202_144630.mp4`
            : "http://localhost:3310/upload/1707367308930.0.7850948621355036.20240202_144630.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707367309003.0.5637058266780037.golden-gate-bridge-4271360_1280.jpg`
            : "http://localhost:3310/upload/1707367309003.0.5637058266780037.golden-gate-bridge-4271360_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 1,
        user_id: 1,
      },
      {
        title: "Bitcoin vers les sommets ?",
        description: "Outsider de la finance jusqu'ou ira Bitcoin ?",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707367618064.0.08091929064130299.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707367618064.0.08091929064130299.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707367618131.0.37109394074004687.bitcoin-2007769_1280.jpg`
            : "http://localhost:3310/upload/1707367618131.0.37109394074004687.bitcoin-2007769_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 3,
        user_id: 1,
      },
      {
        title: "La meute",
        description: "Vivez le quotidien incroyable d'une meute de loups.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366492652.0.09959999332522562.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707366492652.0.09959999332522562.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707367910771.0.7540796086244803.wolf-1992716_1280.jpg`
            : "http://localhost:3310/upload/1707367910771.0.7540796086244803.wolf-1992716_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 5,
        user_id: 1,
      },
      {
        title: "Voyage dans l'Antarctique ",
        description: "Découvrez l'Antarctique comme vous ne l'avez jamais vu. ",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707366492652.0.09959999332522562.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707366492652.0.09959999332522562.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707368171695.0.8904336353786335.landscape-1296307_1280.jpg`
            : "http://localhost:3310/upload/1707368171695.0.8904336353786335.landscape-1296307_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 6,
        user_id: 1,
      },
      {
        title: "La conquête Spatial ",
        description: "Revivez l'épopée de la conquête spatial.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707368577620.0.5296600714357442.20240202_144630.mp4`
            : "http://localhost:3310/upload/1707368577620.0.5296600714357442.20240202_144630.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707368577690.0.6496504098554023.rocket-launch-67643_1280.jpg`
            : "http://localhost:3310/upload/1707368577690.0.6496504098554023.rocket-launch-67643_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 7,
        user_id: 1,
      },
      {
        title: "Apéro Fiesta !",
        description:
          "Découvrez nos meilleurs recettes pour des apéros inoubliables.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707368822434.0.7048422783538013.20240202_144445.mp4`
            : "http://localhost:3310/upload/1707368822434.0.7048422783538013.20240202_144445.mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707368822483.0.8778086313826596.vegetable-skewer-3317060_1280.jpg`
            : "http://localhost:3310/upload/1707368822483.0.8778086313826596.vegetable-skewer-3317060_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 4,
        user_id: 1,
      },
      {
        title: "Les plus belles villas du monde",
        description: "Visitez les plus belles villas du monde.",
        URL_video:
          env === "production"
            ? `${prodURL}/upload/1707369035356.0.6911068796562148.184069 (720p).mp4`
            : "http://localhost:3310/upload/1707369035356.0.6911068796562148.184069 (720p).mp4",
        type_video: 1,
        thumbnail:
          env === "production"
            ? `${prodURL}/upload/1707369035421.0.816107885291548.house-1477041_1280.jpg`
            : "http://localhost:3310/upload/1707369035421.0.816107885291548.house-1477041_1280.jpg",
        date_publication: "2024-02-06 17:18:29",
        validate: 0,
        category_id: 1,
        user_id: 1,
      },
    ];
    const associatedVideoTags = [
      {
        video_id: 1,
        tag_id: 4,
      },
      {
        video_id: 1,
        tag_id: 5,
      },
      {
        video_id: 2,
        tag_id: 1,
      },
      {
        video_id: 2,
        tag_id: 3,
      },
      {
        video_id: 3,
        tag_id: 4,
      },
      {
        video_id: 3,
        tag_id: 3,
      },
      {
        video_id: 4,
        tag_id: 4,
      },
      {
        video_id: 4,
        tag_id: 6,
      },
      {
        video_id: 5,
        tag_id: 5,
      },
      {
        video_id: 5,
        tag_id: 6,
      },
      {
        video_id: 6,
        tag_id: 5,
      },
      {
        video_id: 6,
        tag_id: 6,
      },
    ];
    const users = [
      {
        mail: "alex@gmail.com",
        password: "alex",
        username: "Alex",
      },
      {
        mail: "toto@gmail.com",
        password: "toto",
        username: "toto",
      },
      {
        mail: "lulu@gmail.com",
        password: "lulu",
        username: "Lulu94",
      },
      {
        mail: "Aurel@gmail.com",
        password: "aure",
        username: "Aurel",
      },
      {
        mail: "admin@gmail.com",
        password: "admin",
        username: "Admin",
      },
    ];
    const tags = [
      {
        name: "cats",
      },
      {
        name: "dogs",
      },
      {
        name: "birds",
      },
      {
        name: "bear",
      },
      {
        name: "art",
      },
      {
        name: "yoga",
      },
      {
        name: "marathon",
      },
      {
        name: "pastry",
      },
    ];
    const categories = [
      { name: "Animals" },
      { name: "Architecture" },
      { name: "Art" },
      { name: "Business" },
      { name: "Food" },
      { name: "Nature" },
      { name: "Technology" },
      { name: "Travel" },
      { name: "Sport" },
    ];
    const views = [
      {
        users_id: 2,
        video_id: 11,
        count: 1414243,
      },
      {
        users_id: 3,
        video_id: 18,
        count: 71540,
      },
      {
        users_id: 4,
        video_id: 35,
        count: 145123,
      },
      {
        users_id: 1,
        video_id: 17,
        count: 2145980,
      },
    ];
    const hashingOptions = {
      type: argon.argon2id,
      memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
      timeCost: 2,
      parallelism: 1,
    };
    // Insert fake data into the 'item' table
    for (let i = 0; i < users.length; i += 1) {
      const hash = await argon.hash(users[i].password, hashingOptions);
      queries.push(
        database.query(
          "insert into users(mail, username, password) values (?, ?, ?)",
          [users[i].mail, users[i].username, hash]
        )
      );
    }
    for (let i = 0; i < tags.length; i += 1) {
      queries.push(
        database.query("insert into tags(name) values (?)", [tags[i].name])
      );
    }
    for (let i = 0; i < categories.length; i += 1) {
      queries.push(
        database.query("insert into categories(name) values (?)", [
          categories[i].name,
        ])
      );
    }

    for (let i = 0; i < videos.length; i += 1) {
      queries.push(
        database.query(
          "insert into videos(title, description, URL_video, type_video, thumbnail, date_publication, validate, category_id, user_id ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            videos[i].title,
            videos[i].description,
            videos[i].URL_video,
            videos[i].type_video,
            videos[i].thumbnail,
            videos[i].date_publication,
            videos[i].validate,
            videos[i].category_id,
            videos[i].user_id,
          ]
        )
      );
    }

    for (let i = 0; i < associatedVideoTags.length; i += 1) {
      queries.push(
        database.query("insert into add_tags(video_id,tag_id) values (?,?)", [
          associatedVideoTags[i].video_id,
          associatedVideoTags[i].tag_id,
        ])
      );
    }

    for (let i = 0; i < views.length; i += 1) {
      queries.push(
        database.query(
          "insert into views(users_id, video_id, count) values (?, ?, ?)",
          [views[i].users_id, views[i].video_id, views[i].count]
        )
      );
    }
    /* ************************************************************************* */
    // console.log("queries", await Promise.all(queries));
    // Wait for all the insertion queries to complete
    await Promise.all(queries);
    // Close the database connection
    database.end();
    console.info(`${database.databaseName} update from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};
// Run the seed function
seed();
