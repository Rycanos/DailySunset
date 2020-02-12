import requests
import json
import datetime
import os
from threading import Timer

SUNSET_1 = "sunset"
SUNSET_2 = "civil_twilight_end"
SUNSET_3 = "astronomical_twilight_end"
SUNRISE_1 = "civil_twilight_begin"

URL = "https://api.sunrise-sunset.org/json"
LOC_URL = "http://ipinfo.io"

location = ""
lat = ""
lng = ""

rLoc = requests.post(LOC_URL)

epoch = datetime.datetime.utcfromtimestamp(0)
def unix_time_sec(dt):
    return (dt - epoch).total_seconds()

def take_picture():
    os.system('./takePic.sh')
    print("picture taken")

def launch():
    if rLoc.status_code == 200:
        print("Request post to ipinfo passed\njson:\n", rLoc.text, "\n")
        jLoc = json.loads(rLoc.text)
        tmpLoc = jLoc["loc"]
        cutInd = 0
        i = 0
        while i < len(tmpLoc):
            if tmpLoc[i] == ',':
                cutInd = i
            i += 1
        lat = tmpLoc[0:cutInd]
        lng = tmpLoc[cutInd + 1:]
        print("location lat: ", lat, " lng: ", lng, "\n")

        payload = {'lat': lat, 'lng' : lng, 'date': 'today'}
        rSunset = requests.get(URL, params=payload)
        if rSunset.status_code == 200:
            print("Request post to Sunset api passed\njson:\n", rSunset.text)
            jSunset = json.loads(rSunset.text)
            sunsetTime = jSunset["results"][SUNSET_2]
            timeNow = datetime.datetime.now()
            print("Current time: ", timeNow)
            sunsetTimeDate = timeNow.strftime('%Y-%m-%d') + " " + sunsetTime
            print("sunsetTimeDate: ", sunsetTimeDate)
            timeSunset = datetime.datetime.strptime(sunsetTimeDate, '%Y-%m-%d %I:%M:%S %p')

            delta = unix_time_sec(timeSunset) - unix_time_sec(timeNow)# - 3600
            print("delta difference: ", delta)
            if delta > 0:
                print("taking picture in: %d", delta)
                tPic = Timer(delta, take_picture)
                tPic.start()

                timeNow = datetime.datetime.now()
                timeTomorrow = datetime.datetime.strptime(timeNow.strftime("%Y/%m/%d") + " 12:45:00", "%Y/%m/%d %H:%M:%S")
                #timeTomorrow = timeTomorrow + timedelta(days = 1)
                deltaRelaunch = unix_time_sec(timeTomorrow) - unix_time_sec(timeNow)
                if deltaRelaunch > 0:
                    tRelaunch = Timer(deltaRelaunch, launch)
                    tRelaunch.start()
                else:
                    print("ERROR on relaunch")
            else:
                print("ERROR on delta sunset calc")
        else:
            print("Request for Sunset failed")
    else:
        print("Request for location failed")

launch()
