const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

bot.on('ready', () => {
    console.log(`Connected to Discord successfully as ${bot.user.tag}.`);
})

// Prefix for calling the bot
const PREFIX = '&';

// Reads messages sent to bot and carries out commands
// Takes input of a message and breaks down message into an
// arguments array.

var rankupmessage = "Congratulations on being promoted to the rank of ";

// && msg.member.highestRole.name == "Discord Admin"

bot.on('message', msg => {
    if (msg.channel.type != "dm") {
        if (msg.author.username != "Axiom Rank Bot" && msg.content.substring(0, PREFIX.length) == PREFIX) {
            thename = msg.guild;
            console.log(msg.author.username)
            console.log(msg.content)
            if (thename.id == 154996707115925504) {
                // Axiom values
                var DemigodID = '261520703138824193';
                var AvatarID = '205075111630471168';
                var ChampionID = '205075068282208257';
                var GuardianID = '205074942511939584';
                var ChallengerID = '205074881489010689';
                var ExplorerID = '205074697828696065';
                var VisitorID = '530578373060198430';
            }
            else {
                //Hex Bot Server Values
                var DemigodID = '588075818224189451';
                var AvatarID = '588075863275339788';
                var ChampionID = '588075898050314252';
                var GuardianID = '588075929776160818';
                var ChallengerID = '588075957953495041';
                var ExplorerID = '588152873477603344';
                var VisitorID = '588075989016379424';
            }
            console.log("message recieved");
            let args = msg.content.substring(PREFIX.length).split(" ")

            switch (args[0]) {
                case 'commands':
                    msg.channel.send("\n**&update** - to update existing member roles with promotions. I also message users who rank up to congratulate them." +
                        "\n**&inactive** - to find inactive users of 1 month and 3 months." +
                        "\n**&inactive loud** - same as inactive but marks 3 month absentees with a Purge Tag and messages the offenders." +
                        "\n**&inactive purge** - this command double checks that purge tagged members are still inactive, then kicks members that still have the purged tag" +
                        "\n**&makemember @tagofmember** - makes user a member by removing visitor role and adding the explorer role. Also DM's the user." +
                        "\n**&report** - creates a spreadsheet about current members of Axiom. Posts the file in this channel for you to download." +
                        "\n**&roles** - displays a list of roles on the server and how many people are attached to each role.");
                    break;
                case 'help':
                    msg.channel.send("Hello, I'm Axiom Rank Bot. I automate rankings and provide accurate and cool information for you about our kickass server." +
                        " I use the '&' to signify calls to me. Here are the things I can do for you." +
                        "\n**&update** - to update existing member roles with promotions. I also message users who rank up to congratulate them." +
                        "\n**&inactive** - to find inactive users of 1 month and 3 months." +
                        "\n**&inactive loud** - same as inactive but marks 3 month absentees with a Purge Tag and messages the offenders." +
                        "\n**&inactive purge** - this command double checks that purge tagged members are still inactive, then kicks members that still have the purged tag" +
                        "\n**&makemember @tagofmember** - makes user a member by removing visitor role and adding the explorer role. Also DM's the user." +
                        "\n**&report** - creates a spreadsheet about current members of Axiom. Posts the file in this channel for you to download." +
                        "\n**&roles** - displays a list of roles on the server and how many people are attached to each role.");
                    break;

                //roles provides a look at how many members are assigned to each role.
                //Roles are later displayed in order of hierarchy, top to bottom.
                case 'roles':
                    var Rlist = msg.guild.roles;
                    var roleslist = Rlist.array();
                    var sortedroleslist = [];
                    var newmessage = '';
                    var memberlist;
                    for (j = roleslist.length; j > 0; j--) {
                        for (i = 0; i < roleslist.length; i++) {
                            if (roleslist[i].position == j) {
                                sortedroleslist.push(roleslist[i])
                                break;
                            }
                        }
                    }
                    for (i = 0; i < sortedroleslist.length; i++) {
                        newmessage = newmessage + "\n" + sortedroleslist[i].name;
                        memberlist = sortedroleslist[i].members;
                        memberlist = memberlist.array();
                        newmessage = newmessage + " | " + memberlist.length;
                    }
                    msg.channel.send(newmessage);
                    break;

                // Inactive looks at members last posted message in the discord.
                // It provides a list of people who have not posted for at least one month.
                // It provides a list of people who have not posted in at least 3 months and then DM's them saying they may get removed.
                case 'inactive':
                    if (msg.guild.name == "Heavenly Sword Gaming") {
                        var PurgeID = '550535249491132419';
                    }
                    else {
                        var PurgeID = '589917312107413549';
                    }

                    var collect = msg.guild.members;
                    var thelist = collect.array();
                    var inactives = [];
                    var purges = [];

                    if (args[1] == 'purge') {
                        for (i = 0; i < thelist.length; i++) {
                            var lastpost = 0;
                            if (thelist[i].roles.has(PurgeID) && thelist[i].highestRole.name != "Discord Admin" && thelist[i].user.bot != true) {
                                console.log("Purge working");
                                if (thelist[i].lastMessage != null) {
                                    lastpost = thelist[i].lastMessage.createdTimestamp;
                                }
                                else {
                                    lastpost = thelist[i].joinedTimestamp;
                                }
                                if (Date.now() - lastpost > 3 * 2629800000) {
                                    purges.push(thelist[i].displayName);
                                    thelist[i].kick();
                                }
                                else {
                                    thelist[i].removeRole(PurgeID);
                                }
                            }
                        }
                        var themessage = "The following users have been kicked:"
                        for (i = 0; i < purges.length; i++) {
                            themessage = themessage + '\n' + purges[i];
                        }
                        themessage = themessage + "\nPurge tag is empty.";
                        msg.channel.send(themessage);
                    }
                    else {
                        var silent = true;
                        if (args[1] == 'loud') {
                            silent = false;
                        }
                        for (i = 0; i < thelist.length; i++) {
                            var lastpost = 0;
                            if (thelist[i].user.bot != true) {
                                if (thelist[i].lastMessage != null) {
                                    lastpost = thelist[i].lastMessage.createdTimestamp;
                                }
                                else {
                                    lastpost = thelist[i].joinedTimestamp;
                                }
                                if (Date.now() - lastpost > 2629800000) {
                                    if (Date.now() - lastpost > 3 * 2629800000) {
                                        if (silent == false) {
                                            thelist[i].addRole(PurgeID);
                                            thelist[i].send("You haven't posted to Axiom in three months. We miss you. Please post soon, as we remove inactive users.");
                                        }
                                        purges.push(thelist[i].displayName);
                                    }
                                    else {
                                        inactives.push(thelist[i].displayName);
                                    }
                                }
                                else {
                                    thelist[i].removeRole(PurgeID);
                                }
                            }
                        }
                        var themessage = "**INACTIVE** | 1 month\n"
                        if (inactives.length > 0) {
                            for (i = 0; i < inactives.length; i++) {
                                themessage = themessage + " - " + inactives[i] + "\n";
                            }
                        }
                        else themessage = themessage + "Nobody :) \n";
                        if (silent == true) {
                            themessage = themessage + "**Would be tagged with purge** | 3 months\n";
                        }
                        else {
                            themessage = themessage + "**Tagged for Purge** | 3 months\n";
                        }
                        if (purges.length > 0) {
                            for (i = 0; i < purges.length; i++) {
                                themessage = themessage + " - " + purges[i] + "\n";
                            }
                        }
                        else themessage = themessage + "Nobody :)";
                        if (silent == true) {
                            themessage = themessage + "\n\n**This was only a test**\nTo assign the purge role and message inactive users, call '&inactive loud'.";
                        }
                        else {
                            themessage = themessage + "\n\nMembers have been messaged.\nTo purge members, call '&inactive purge'.\nIt will doublecheck before kicking everyone marked with purge";
                        }
                        var filetitle = "InactiveResults.txt";
                        fs.writeFile(filetitle, themessage, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                        msg.reply(new Discord.Attachment(filetitle));
                        if (silent == true) {
                            msg.channel.send("**This was only a test**\nTo assign the purge role and message inactive users, call '&inactive loud'.");
                        }
                        else {
                            msg.channel.send("Members have been messaged.\nTo purge members, call '&inactive purge'.\nIt will doublecheck before kicking everyone marked with purge");
                        }
                        break;
                    }
                // update goes through each non-bot member and promotes them based on time they have been in the server.
                // it also DM's the user informing them of their rank change with a congratulations.
                // This only functions with the time based ranks and has no effect over leadership, bots, legends, ambassadors, or visitors.
                case 'update':
                    var collect = msg.guild.members;
                    var thelist = collect.array();
                    var promoted = [["**Demigod** | 3 years"], ["**Avatar** | 2 years"], ['**Champion** | 1 year'], ["**Guardian** | 6 months"], ["**Challenger** | 2 months"]];
                    for (i = 0; i < thelist.length; i++) {
                        if (thelist[i].user.bot != true) {
                            var roles = ['Avatar', 'Champion', 'Guardian', 'Challenger', 'Explorer'];
                            var currentRole = thelist[i].highestRole.name;
                            var promotions = 0;
                            var time = Date.now() - thelist[i].joinedTimestamp;
                            var month = 2629800000;
                            var year = 31557600000;

                            switch (currentRole) {
                                case 'Avatar':
                                    if (time / year >= 3) {
                                        thelist[i].addRole(DemigodID);
                                        thelist[i].removeRole(AvatarID);
                                        thelist[i].send(rankupmessage + "Demigod! Thanks for sticking with Axiom for 3 years!");
                                        promoted[0].push(thelist[i].displayName);
                                    }
                                    break;

                                case 'Champion':
                                    if (time / year >= 2) {
                                        thelist[i].addRole(AvatarID);
                                        thelist[i].removeRole(ChampionID);
                                        thelist[i].send(rankupmessage + "Avatar! Thanks for sticking with Axiom for 2 years!");
                                        promoted[1].push(thelist[i].displayName);
                                    }
                                    break;
                                case 'Guardian':
                                    if (time / year >= 1) {
                                        thelist[i].addRole(ChampionID);
                                        thelist[i].removeRole(GuardianID);
                                        thelist[i].send(rankupmessage + "Champion! Thanks for sticking with Axiom for a year!");
                                        promoted[2].push(thelist[i].displayName);
                                    }
                                    break;
                                case 'Challenger':
                                    if (time / month >= 6) {
                                        thelist[i].addRole(GuardianID);
                                        thelist[i].removeRole(ChallengerID);
                                        thelist[i].send(rankupmessage + "Guardian! Thanks for sticking with Axiom for 6 months!");
                                        promoted[3].push(thelist[i].displayName);
                                    }
                                    break;
                                case 'Explorer':
                                    if (time / month >= 2) {
                                        thelist[i].addRole(ChallengerID);
                                        thelist[i].removeRole(ExplorerID);
                                        thelist[i].send(rankupmessage + "Challenger! Thanks for sticking with Axiom for 2 months!");
                                        promoted[4].push(thelist[i].displayName);
                                    }
                                    break;
                            }
                        }
                    }
                    var promotioncount = 0;
                    var stringpromotions = ""
                    for (i = 0; i < promoted.length; i++) {
                        if (promoted[i].length > 1) {
                            stringpromotions = stringpromotions + promoted[i][0] + " \n";
                            for (k = 1; k < promoted[i].length; k++) {
                                stringpromotions = stringpromotions + " - " + promoted[i][k] + "\n";
                                promotioncount++;
                            }
                        }
                    }
                    msg.channel.send("The Following members were promoted!\n" + stringpromotions + "\nTotal of " + promotioncount + " promotions.");
                    break;
                // This function makes a visitor into a member of challenger rank. They are DM'd a notification and roles are assigned and removed accordingly.
                case 'makemember':
                    var failure = false;
                    if (args[1] != undefined) {
                        var memberID = args[1].substring(2, args[1].length - 1);
                        if (msg.guild.member(memberID) != null) {
                            msg.guild.member(memberID).addRole(ExplorerID);
                            msg.guild.member(memberID).send("You are now a member of Axiom and have been given the rank of Explorer! Welcome!")
                            msg.guild.member(memberID).removeRole(VisitorID);
                            msg.channel.send("User is now a member of Axiom.");
                        }
                        else {
                            msg.channel.send("That member doesn't seem to exist. Make sure you have tagged them correctly.");

                        }
                    }
                    else {
                        msg.channel.send('After typing &makemember you must include a valid tagged member of the server. I.E. &makemember @AxiomDiscordBot');
                    }
                    break;
                //This creates a CSV report that is sent to the caller as an attachment.
                //The CSV contains membername, ID, highest role, join date.
                case 'report':
                    var collect = msg.guild.members;
                    var thelist = collect.array();
                    var today = new Date();
                    var output = "Displayname, ID, Highest Role, Join Date, Last Post Date";
                    for (i = 0; i < thelist.length; i++) {
                        if (thelist[i].user.bot != true) {
                            var dateofjoin = thelist[i].joinedAt;
                            var datestring = (dateofjoin.getMonth() + 1) + "-" + dateofjoin.getDate() + "-" + dateofjoin.getFullYear();
                            if (thelist[i].lastMessage != null) {
                                var dateoflastpost = thelist[i].lastMessage.createdAt;
                                var lastpostdate = (dateoflastpost.getMonth() + 1) + "-" + dateoflastpost.getDate() + "-" + dateoflastpost.getFullYear();
                            }
                            else {
                                var lastpostdate = "none"
                            }
                            output = output + "\n" + thelist[i].displayName + "," + thelist[i].id + "," + thelist[i].highestRole.name + "," + datestring + "," + lastpostdate;
                        }
                    }
                    var filetitle = "Axiom Member File " + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear() + ".csv";
                    fs.writeFile(filetitle, output, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    msg.reply(new Discord.Attachment(filetitle));
                    break;

            }
        }
    }

});

bot.login(require("./config.json").token);