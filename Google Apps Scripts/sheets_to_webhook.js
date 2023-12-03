const POST_URL = "WEBHOOKURL";

function onEdit(event){
    const sheet_name = event.range.getSheet().getName();
    const rangeNotation = event.range.getA1Notation();
    const oldValue = event.oldValue;
    const value = event.value;
    const icon_url = "https://cdn.discordapp.com/attachments/810745935406563358/971632032721543168/11.png?ex=654c6258&is=6539ed58&hm=6482c9ebc59d5a8c8e2565088c69b946b57168375b3f3a3eb225d90d4f55be5b&"
    const backticks = "```";

    const range = event.range;
    const row = range.getRow();
    const column = range.getColumn();

    var options;

    var language;
    var server_name;
    var version;
    var invite_link;
    var application_status;
    var smp_location;
    var cmp_location;
    var description;

    if(sheet_name === "Java Archives" ||
        sheet_name === "Bedrock Archives" ||
        sheet_name === "Java Discussion" ||
        sheet_name === "Bedrock Discussion" ||
        sheet_name === "Personal (Java)" ||
        sheet_name === "Personal (Bedrock)") {
        language = SpreadsheetApp.getActiveSheet().getRange("B" + row).getValue();
        server_name = SpreadsheetApp.getActiveSheet().getRange("C" + row).getValue();
        invite_link = SpreadsheetApp.getActiveSheet().getRange("D" + row).getValue();
        description = SpreadsheetApp.getActiveSheet().getRange("E" + row).getValue();

        options = {
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "payload": JSON.stringify({
                "content": invite_link,
                "embeds": [{
                    "title": server_name,
                    "description": ` ${backticks}ansi\n\u001b[2;34m${description}\u001b[0m\n${backticks} `,
                    "url": invite_link,
                    "color": 0,
                    "footer": {
                        "text": `[${language}] • ${invite_link}`,
                        "icon_url": icon_url
                    }
                }]
            })
        };
    } else {
        language = SpreadsheetApp.getActiveSheet().getRange("B" + row).getValue();
        server_name = SpreadsheetApp.getActiveSheet().getRange("C" + row).getValue();
        version = SpreadsheetApp.getActiveSheet().getRange("D" + row).getValue();
        invite_link = SpreadsheetApp.getActiveSheet().getRange("E" + row).getValue();
        application_status = SpreadsheetApp.getActiveSheet().getRange("F" + row).getValue();
        smp_location = SpreadsheetApp.getActiveSheet().getRange("G" + row).getValue();
        cmp_location = SpreadsheetApp.getActiveSheet().getRange("H" + row).getValue();

        if(smp_location === "" || cmp_location === "") {
            options = {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "payload": JSON.stringify({
                    "content": invite_link,
                    "embeds": [{
                        "title": server_name,
                        "description": ` ${backticks}ansi\n[\u001b[2;32m${application_status}\u001b[0m] \u001b[2;33m${version}\u001b[0m\n${backticks}`,
                        "url": invite_link,
                        "color": 0,
                        "footer": {
                            "text": `[${language}] • ${invite_link}`,
                            "icon_url": icon_url
                        }
                    }]
                })
            };
        } else if(smp_location === cmp_location) {
            options = {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "payload": JSON.stringify({
                    "content": invite_link,
                    "embeds": [{
                        "title": server_name,
                        "description": ` ${backticks}ansi\n[\u001b[2;32m${application_status}\u001b[0m] \u001b[2;33m${version}\u001b[0m\n\u001b[2;37mSMP • CMP\u001b[0m » \u001b[2;34m${smp_location}\u001b[0m\n${backticks}`,
                        "url": invite_link,
                        "color": 0,
                        "footer": {
                            "text": `[${language}] • ${invite_link}`,
                            "icon_url": icon_url
                        }
                    }]
                })
            };
        } else {
            options = {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "payload": JSON.stringify({
                    "content": invite_link,
                    "embeds": [{
                        "title": server_name,
                        "description": ` ${backticks}ansi\n[\u001b[2;32m${application_status}\u001b[0m] \u001b[2;33m${version}\u001b[0m\n\u001b[2;37mSMP »\u001b[0m \u001b[2;34m${smp_location}\u001b[0m \u001b[2;37m• CMP »\u001b[0m\u001b[2;37m\u001b[0m \u001b[2;34m${cmp_location}\u001b[0m\n${backticks}`,
                        "url": invite_link,
                        "color": 0,
                        "footer": {
                            "text": `[${language}] • ${invite_link}`,
                            "icon_url": icon_url
                        }
                    }]
                })
            };
        }
    }


    if(sheet_name === "Java Tech") {
        if(row > 5 && row !== 13 && row !== 35 || row && 80 && row !== 112) {
            UrlFetchApp.fetch(POST_URL, options);
        }
    } else {
        if(row > 5) {
            UrlFetchApp.fetch(POST_URL, options);
        }
    }
}