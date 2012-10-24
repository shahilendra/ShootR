﻿function MyRankings() {
    var that = this,
        myPosition = false, // Initially set to a very high value so we flash green on leaderboard position first update
        globalRanking = $("#GlobalRanking"),
        killsEle = $("#Kills"),
        deathsEle = $("#Deaths"),
        kdRatioEle = $("#KDRatio"),
        lastKills,
        lastDeaths;

    that.LoadPosition = function (newPosition) {
        if (myPosition != newPosition) {
            if (myPosition) {
                globalRanking.stop(true);
                globalRanking.animate({ color: "#FFFFFF" }, 500).animate({ color: "#7F7F7F" }, 500);
            }

            myPosition = newPosition;

            globalRanking.html(myPosition);
        }
    }

    that.Update = function (kills, deaths) {
        if (kills != lastKills || deaths != lastDeaths) {

            if (kills != lastKills) {
                killsEle.stop(true);
                killsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                killsEle.html(kills);
            }

            if (deaths != lastDeaths) {
                deathsEle.stop(true);
                deathsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                deathsEle.html(deaths);
            }                       

            var finalRatio;

            if (deaths === 0 && kills !== 0) {
                finalRatio = "∞";
            }
            else if (deaths === 0 && kills === 0) {
                finalRatio = "";
            }
            else {
                var kRatio, dRatio;

                if (kills <= deaths && kills !== 0) {
                    kRatio = 1;
                    dRatio = Math.round((deaths / kills) * 10) / 10
                }
                else {
                    kRatio = Math.round((kills / deaths) * 10) / 10;
                    dRatio = 1;
                }

                finalRatio = kRatio + ":" + dRatio;
            }

            kdRatioEle.html(finalRatio);

            lastKills = kills;
            lastDeaths = deaths;
        }
    }
}