# NPR stats

The purpose of this document is to outline the steps to export the NPR monthly radio show stats from the hub.

## Perquisites

You will need the following in order run the script and format the stats so they can be sent to NPR.

1. **Access to production environment:** You will need to have access and be connected via ssh tunnel to the cloud gateway in order for the app to work

2. **SQLITE database:** You will also need a SQLITE client to be able to run SQL scripts against the generated SQLITE databases, such as [sqlitebrowser](http://sqlitebrowser.org/) or [sqlitepro](https://www.sqlitepro.com/)

3. **PIWIK token**: Log in to PIWIK (via ssh tunnel) then click on the person icon towards the top right, which will take you to your personal settings.  Click the API option on the left hand panel to access the user authentication token

4. **Node & npm:** if you need to install node and npm you can following [these instructions](https://nodejs.org/en/)


## App setup

Download this app into a directory on your computer, then open a terminal session and move into the directory where you download the app too, the run the following commands.

```
npm install
```

## Running the stats export.

> **Note:** in the instructions below we are assuming that you are pulling all the stats from Berwyn for February 2018.

First make sure you are connected to Berwyn via the ssh tunnel

Next you need to create a shell script file, in your terminal while still in the folder with the app in run the following command:

```
touch berwyn_feb_2018.sh
```

The update the shell script files permissions so it can be executed using the following command.

```
Chmod +x berwyn_feb_2018.sh
```

Using a plain text editor such as *TextEdit* on a mac open the `berwyn_feb_2018.sh` file and add the following remembering to replace 'token12356' with your real PIWIK token

```
#!/bin/bash
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_feb_2018.sqlite node pull.js 2018-02-01
```

> **Note** When using *TextEdit* make sure that you have set it to plain text mode using `Format > Make Plain Text`.

The script pulls the stats for one day, so if you would like to pull the stats for one month say for example February your script would looks something like this.

```
#!/bin/bash
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-01
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-02
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-03
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-04
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-05
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-06
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-07
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-08
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-09
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-10
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-11
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-12
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-13
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-14
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-15
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-16
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-17
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-18
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-19
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-20
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-21
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-22
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-23
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-24
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-25
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-26
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-27
URL=http://digital-hub.bwi.dpn.gov.uk:12001/index.php TOKEN=token12356 DB=berwyn_npr_feb2018.sqlite node pull.js 2018-02-28

```

To run the script use the following:

```
./berwyn_feb_2018.sh
```

The process can take between 15 to 30 mins.

## Format the stats.

Create table holding only radio shows make sure to change the dates in the script

> **Note** Change dates in this SQLITE statement to mach reporting month

```
create table pra_monthly as
select
    adet.eventname eventname,
    adet.eventaction eventaction,
    count(pageid) sumtime --sum(adet.timespent) sumtime
from
    actiondetails adet,
    visits vis
where
    vis.idvisit = adet.idvisit
    and strftime(
        '%Y-%m-%d',
        datetime(serverTimestamp, 'unixepoch')
    ) between '2018-02-01'
    and '2018-02-28'
    and (
        eventname like '%straightline%'
        or eventname like '%npr friday%'
        or eventname like '%work it%'
        or eventname like '%prime time%'
        or eventname like '%freedom inside%'
        or eventname like '%ppf%'
        or eventname like '%past present%'
        or eventname like '%past, present%'
        or eventname like '%bob and beyond%'
        or eventname like '%check up%'
        or eventname like '%hot 20%'
        or eventname like '%porridge%'
        or eventname like '%prison news%'
        or eventname like '%rock show%'
        or eventname like '%takeover%'
        or eventname like '%poridge%'
    )
    and eventname not like '%your straightline%'
group by
    eventname,
    eventaction
order by
    eventname,
    eventaction;
```

Create separate tables from this table for each percentage

```
create table pra_25_monthly as
select
    *
from
    pra_monthly
where
    eventaction = '25%'; create table pra_50_monthly as
select
    *
from
    pra_monthly
where
    eventaction = '50%'; create table pra_75_monthly as
select
    *
from
    pra_monthly
where
    eventaction = '75%'; create table pra_90_monthly as
select
    *
from
    pra_monthly
where
    eventaction = '90%';
```

Check that we haven’t missed any shows due to typos

> **Note** Change dates in this SQLITE statement to mach reporting month

```
select
    distinct eventname
from
    visits vis,
    actiondetails actd
where
    vis.idvisit = actd.idvisit
    and strftime(
        '%Y-%m-%d',
        datetime(serverTimestamp, 'unixepoch')
    ) between '2018-02-01'
    and '2018-02-28'
    and eventcategory = 'Radio'
EXCEPT
select
    distinct eventname
from
    pra_monthly;
```

Check how many shows we are missing due to there being entries only in 90/75/50

```
select
    sum(countage)
from
    (
        select
            count(*) countage
        from
            (
                select
                    eventname
                from
                    pra_90_monthly
                except
                select
                    eventname
                from
                    pra_75_monthly
            )
        union all
        select
            count(*) countage
        from
            (
                select
                    eventname
                from
                    pra_75_monthly
                except
                select
                    eventname
                from
                    pra_50_monthly
            )
        union all
        select
            count(*) countage
        from
            (
                select
                    eventname
                from
                    pra_50_monthly
                except
                select
                    eventname
                from
                    pra_25_monthly
```

Create flat table with percentage count listens

```
create table pra_monthly_flat as
select
    p25.eventname eventname,
    coalesce(p25.sumtime, 0) count25,
    coalesce(p50.sumtime, 0) count50,
    coalesce(p75.sumtime, 0) count75,
    coalesce(p90.sumtime, 0) count90
from
    pra_25_monthly p25
    left outer join pra_50_monthly p50 using (eventname)
    left outer join pra_75_monthly p75 using (eventname)
    left outer join pra_90_monthly p90 using (eventname);
```

Final select statement to be sent to PRA

```
select
    eventname,
    case when (count25 - count50) < 0 then 0 else (count25 - count50) end as listen25,
    case when (count50 - count75) < 0 then 0 else (count50 - count75) end as listen50,
    case when (count75 - count90) < 0 then 0 else (count75 - count90) end as listen75,
    count90 listen100
from
    pra_monthly_flat;
```

Now download the `pra_monthly_flat` table as a `csv` file.
