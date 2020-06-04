// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null); // Shorten command names (keep this line here)
PennController.AddHost("http://www.coli.uni-saarland.de/~jachmann/C3-EXP/"); // Pictures


Sequence("consent", "consent2", "demographics", "instructions", "practice", "end_of_prac", "experiment", SendResults() , "outro", "postexp_survey")

// Consent 1
PennController("consent",
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("Fortfahren")
        .center()
        .bold()
        .print()
        .wait()
)
.log("survey", "CAPsurvey")

// Consent 2
PennController("consent2",
    newHtml("consent2", "consent2.html")
        .settings.checkboxWarning("Bitte stimmen Sie der Teilnahme zu.")
        .settings.inputWarning("Bitte geben Sie Ihre Prolific-ID an.")
        .log()
        .print()
    ,
    newButton("Fortfahren")
        .center()
        .bold()
        .print()
        // Continue only if the html has been filled in:
        .wait(
              getHtml("consent2").test.complete()
                  .failure(  getHtml("consent2").warn()  )
        )
        // .wait()
)
.log("survey", "CAPsurvey")

// Demographics
PennController("demographics",
    newHtml("demographics", "demographics.html")
        .settings.inputWarning("Bitte tragen Sie Ihre Muttersprache(n) und Ihr Alter ein.")
        .settings.radioWarning("Bitte geben Sie Ihr Geschlecht und Ihre H&auml;ndigkeit an.")
        .log()
        .print()
    ,
    newButton("Fortfahren")
        .center()
        .bold()
        .print()
        // Continue only if the html has been filled in:
        .wait(
              getHtml("demographics").test.complete()
                  .failure(  getHtml("demographics").warn()  )
        )
        // .wait()
)
.log("survey", "CAPsurvey")

// Instructions
PennController("instructions",
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newText("Links", "&nbsp;Ja&nbsp;")
    ,
    newText("Rechts", "Nein")
    ,
    newCanvas(200,150)
        .add(200,10, newText("Taste D").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "20px 10px 10px 10px"}))
        .add(470,10, newText("Taste K").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "20px 10px 10px 10px"}))
        .add(200,60, getText("Links").color("green").bold().cssContainer(
            {"font-family": "monospace", "font-size": "30px", "border": "solid 1px green", "padding": "10px 10px 10px 10px"}))
        .add(470,60, getText("Rechts").color("red").bold().cssContainer(
            {"font-family": "monospace", "font-size": "30px", "border": "solid 1px red", "padding": "10px 28px 10px 28px"}))
        .log()
        //.center()
        .print()
    ,
    newText("<p>Es geht nun los mit ein paar &Uuml;bungss&auml;tzen.</p>")
        .cssContainer({"font-family": "serif", "font-size": "20px"})
        .left()
        .print()
    ,
    newButton("&Uuml;bungss&auml;tze starten")
        .center()
        .bold()
        .print()
        .wait()
)
.log("survey", "CAPsurvey")

// Break screen
PennController("end_of_prac",
    newHtml("end_of_prac", "end_of_prac.html")
        .print()
    ,
    newButton("Mit dem Experiment beginnen")
        .center()
        .bold()
        .print()
        .wait()
)
.log("survey", "CAPsurvey")

// Outro
PennController("outro",
    newHtml("outro", "outro.html")
        .print()
    ,
    newButton("Fortfahren")
        .center()
        .bold()
        .print()
        .wait()
)
.log("survey", "CAPsurvey")

PennController("postexp_survey",
    newHtml("postexp_survey", "postexp_survey.html")
        .log()
        .print()
    ,
    newButton("Beenden")
        .center()
        .bold()
        .print()
        .wait()
)
.log("survey", "CAPsurvey")

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
//Sequence("intro","experiment", SendResults() , "bye" )


// What is in Header happens at the beginning of every single trial
//Header(
    // We will use this global Var element later to store the participant's name
//    newVar("ParticipantName")
//        .global()
//    ,
    // Delay of 250ms before every trial
//    newTimer(250)
//        .start()
//        .wait()
//)
//.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


//newTrial( "intro" ,
//    newText("Anrede","<p>Liebe Teilnehmerin, lieber Teilnehmer,</p>")
//        .center()
//        .bold()
//        .cssContainer(
//                {"font-family": "monospace", "font-size": "25px"})
//    ,
//    newText("first","<p>im Rahmen einer wissenschaftlichen Studie zur Sprachverarbeitung m&ouml;chten wir Ihre Lesezeit aufzeichnen, w&auml;hrend Sie W&ouml;rter oder S&auml;tze auf einem Bildschirm sehen. Genauere Instruktionen erfolgen unmittelbar vor Beginn des Experiments.</p>")
//        .cssContainer(
//                {"font-family": "monospace", "font-size": "18px"})
//    ,
//    newText("second","<p>Die Ergebnisse des Experiments werden in keiner Weise mir Ihren pers&ouml;nlichen Daten in Verbindung gebracht. F&uuml;r statistische Zwecke werden lediglich Alter, Geschlecht, Sprach-, und H&auml;ndigkeitsdaten verwendet. Die gesammelten Ergebnisse aller Teilnehmer werden ausschlie&szlig;lich f&uuml;r die wissenschaftliche Analyse verwendet. Die Untersuchung dient ausschlie&szlig;lich Forschungszwecken, wobei Ihre anonymisierten Daten zu wissenschaftlichen Zwecken an Dritte (Forschungseinrichtungen) weitergegeben werden k&ouml;nnen. Pers&ouml;nliche Daten, die R&uuml;ckschl&uuml;sse auf Ihre Identit&auml;t erm&ouml;glichen k&ouml;nnten, werden unmittelbar nach Abschluss der Studie vernichtet.</p>")
//        .cssContainer(
//                {"font-family": "monospace", "font-size": "18px"})
//    ,
//        
//    newText("third","<p>F&uuml;r Ihre Teilnahme an diesem Versuch, der ca. 15 Minuten dauern wird, erhalten Sie eine Aufwandsentsch&auml;digung, die abh&auml;ngig von der durchschnittlichen Dauer der Studie ist (wie auf Prolific angegeben). Eine medizinische oder psychologische Beurteilung Ihrer Daten erfolgt nicht.</p>")
//        .cssContainer(
//                {"font-family": "monospace", "font-size": "18px"})
//    ,
//    newCanvas("opening",800,460)
//        .add("center at 50%", 0,getText("Anrede"))
//        .add("center at 50%",70,getText("first"))
//        .add("center at 50%",160,getText("second"))
//        .add("center at 50%",345,getText("third"))
//        .print()
//    ,
//    newButton("Zustimmen")
//        .center()
//        .print()
//        .wait()
//)

Template( "Practice.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "practice" ,
         // The trials are minimal: choose a pronoun from a DropDown list
        newImage("screen",row.Screen)
            .size( 400 , 400 )
        ,

        newCanvas("Task",400,150)
            .center()
            .add(0,0,getImage("screen"))
            //.add("center at 50%", "middle at 50%",getController("DashedSentence"))
            .log()
            .print()
        ,

        newController("DashedSentence", {s: row.Sentence, mode:"self-paced reading", display: "in place", blankText: "#"})
            .cssContainer({"font-family": "monospace", "font-size": "25px", "z-index": "1", "position": "relative", "width":"49%", "padding": "0px 0px 0px 101px"})
            .log()
            .print()
            .wait()
            .remove()
        ,

        getCanvas("Task")
            .remove()
        ,
        //newImage("screen",row.Screen)
        //    .size( 400 , 400 )
        //    .center()
        //    .print()
        //,
        
        //newController("DashedSentence", {s: row.Sentence, mode:"self-paced reading", display: "in place", blankText: "#"})
        //    .cssContainer({"font-family": "monospace", "font-size": "25px"})
        //    .print()
        //    .log()
        //    .wait()
        //    .remove()
        //,
        //getImage("screen")
        //    .remove()
        //,
        newText("Question", "War die Aussage korrekt?")
            .center()
            .italic()
            .cssContainer({"font-family": "monospace", "font-size": "25px"})
            .print()
        ,
        newText("Links", "&nbsp;Ja&nbsp;")
        ,
        newText("Rechts", "Nein")
        ,
        newCanvas("respond",400,400)
            .add(30,50, newText("Taste D").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
            .add(300,50, newText("Taste K").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
            .add(30,100, getText("Links").color("green").bold().cssContainer(
                {"font-family": "monospace", "font-size": "30px", "border": "solid 1px green", "padding": "10px 10px 10px 10px"}))
            .add(300,100, getText("Rechts").color("red").bold().cssContainer(
                {"font-family": "monospace", "font-size": "30px", "border": "solid 1px red", "padding": "10px 10px 10px 10px"}))
            .log()    
            .print()
        ,
        newKey("decide", "DK")
            .wait()
            .log()
        ,
        getText("Question")
            .remove()
        ,
        getCanvas("respond")
            .remove()
        ,
        newCanvas("positive feedback",400,400)
            .add("center at 50%", 100 ,newText("Richtig!").color("green").bold().cssContainer(
                {"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"}))
            .add("center at 50%", 200, newText("Dr&uuml;cke Enter um fortzufahren").cssContainer(
                {"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
        ,
        newCanvas("negative feedback",400,400)
            .add("center at 50%", 100 ,newText("Falsch...").color("red").bold().cssContainer(
                {"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"}))
            .add("center at 50%", 200, newText("Dr&uuml;cke Enter um fortzufahren").cssContainer(
                {"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
        ,
        //newText("positive feedback", "Richtig!")
        //    .cssContainer({"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"})
        //    .center()
        //,
        //newText("negative feedback", "Falsch...")
        //    .cssContainer({"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"})
        //    .center()
        //,
        getKey("decide")    
            .test.pressed(row.CorKey)
            .success( 
                getCanvas("positive feedback")
                    .print()
            )
            .failure(
                getCanvas("negative feedback")
                    .print()
            )
    ,
        newKey("continue","Enter")
        .wait()
    )
    .log( "Item" , row.Item )
    .log( "Order" , row.Order )
    .log( "Cond" , row.Cond )
    .log( "Type" , row.Type)
    .log( "CorrectKey" , row.CorKey )
    // Add these three columns to the results lines of these Template-based trials
)



// This Template command generates as many trials as there are rows in myTable.csv
Template( "List1.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "experiment" ,
         // The trials are minimal: choose a pronoun from a DropDown list
        newImage("screen",row.Screen)
            .size( 400 , 400 )
        ,

        newCanvas("Task",400,150)
            .center()
            .add(0,0,getImage("screen"))
            //.add("center at 50%", "middle at 50%",getController("DashedSentence"))
            .log()
            .print()
        ,

        newController("DashedSentence", {s: row.Sentence, mode:"self-paced reading", display: "in place", blankText: "#"})
            .cssContainer({"font-family": "monospace", "font-size": "25px", "z-index": "1", "position": "relative", "width":"49%", "padding": "0px 0px 0px 101px"})
            .log()
            .print()
            .wait()
            .remove()
        ,

        getCanvas("Task")
            .remove()
        ,
        //newImage("screen",row.Screen)
        //    .size( 400 , 400 )
        //    .center()
        //    .print()
        //,
        
        //newController("DashedSentence", {s: row.Sentence, mode:"self-paced reading", display: "in place", blankText: "#"})
        //    .cssContainer({"font-family": "monospace", "font-size": "25px"})
        //    .print()
        //    .log()
        //    .wait()
        //    .remove()
        //,
        //getImage("screen")
        //    .remove()
        //,
        newText("Question", "War die Aussage korrekt?")
            .center()
            .italic()
            .cssContainer({"font-family": "monospace", "font-size": "25px"})
            .print()
        ,
        newText("Links", "Ja")
        ,
        newText("Rechts", "Nein")
        ,
        newCanvas("respond",400,400)
            .add(30,50, newText("Taste D").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
            .add(300,50, newText("Taste K").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
            .add(30,100, getText("Links").color("green").bold().cssContainer(
                {"font-family": "monospace", "font-size": "30px", "border": "solid 1px green", "padding": "10px 10px 10px 10px"}))
            .add(300,100, getText("Rechts").color("red").bold().cssContainer(
                {"font-family": "monospace", "font-size": "30px", "border": "solid 1px red", "padding": "10px 10px 10px 10px"}))
            .log()    
            .print()
        ,
        newKey("decide", "DK")
            .wait()
            .log()
        ,
        getText("Question")
            .remove()
        ,
        getCanvas("respond")
            .remove()
        ,
        newCanvas("positive feedback",400,400)
            .add("center at 50%", 100 ,newText("Richtig!").color("green").bold().cssContainer(
                {"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"}))
            .add("center at 50%", 200, newText("Dr&uuml;cke Enter um fortzufahren").cssContainer(
                {"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
        ,
        newCanvas("negative feedback",400,400)
            .add("center at 50%", 100 ,newText("Falsch...").color("red").bold().cssContainer(
                {"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"}))
            .add("center at 50%", 200, newText("Dr&uuml;cke Enter um fortzufahren").cssContainer(
                {"font-family": "monospace", "font-size": "15px", "padding": "10px 10px 10px 10px"}))
        ,
        //newText("positive feedback", "Richtig!")
        //    .cssContainer({"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"})
        //    .center()
        //,
        //newText("negative feedback", "Falsch...")
        //    .cssContainer({"font-family": "monospace", "font-size": "25px", "padding": "10px 10px 10px 10px"})
        //    .center()
        //,
        getKey("decide")    
            .test.pressed(row.CorKey)
            .success( 
                getCanvas("positive feedback")
                    .print()
            )
            .failure(
                getCanvas("negative feedback")
                    .print()
            )
    ,
        newKey("continue","Enter")
        .wait()
    )
    .log( "Item" , row.Item )
    .log( "Order" , row.Order )
    .log( "Cond" , row.Cond )
    .log( "Type" , row.Type)
    .log( "CorrectKey" , row.CorKey )
    // Add these three columns to the results lines of these Template-based trials
)


// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
//newTrial( "bye" ,
//    newText("Thank you for your participation!").print(),
//    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
//)
//.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
