# Correct!v data to Pololo

# Person
    #Memberships
# Organizations


import os
import unicodecsv as csv
import json
from pprint import pprint
from normality import slugify
from uuid import uuid4

persons = []
chapters = []
jobs = []
contracts = []

#to do:
# person basics,
# chapters,
# jobs
# contracts

def write_list_to_csv(list, fname):
    headers = set([item for sublist in [i.keys() for i in list] for item in sublist])
    with open(fname + ".csv", "w") as fh:
        writer = csv.writer(fh, delimiter=',')
        writer.writerow(headers)
        for row in list:
            writer.writerow([row.get(h) for h in headers])


with open('data/ttip_correctiv_en.json', 'rb') as fh:
    data = json.load(fh)

    for person in data.get('persons').values():
        personId = slugify(person.get('name'))

        #chapters []
        for ch in person.get('chapters'):
            chapt = {
                'person_id': personId,
                'chapter_id': slugify(ch),
                'chapter': ch
            }
            chapters.append(chapt)
        person.pop('chapters', None)

        #contracts [{}]
        for c in person.get('contracts'):
            c['contract_id'] = slugify(c.get('contract'))
            c['person_id'] = personId
            contracts.append(c)
        person.pop('contracts', None)

        #jobs [{}]
        for j in person.get('jobs'):
            j['job_id'] = slugify(j.get('organisation'))
            j['person_id'] = personId
            jobs.append(j)
        person.pop('jobs', None)

        #persons { p: [{}]}
        person['id'] = personId
        persons.append(person)

    #writes chapters
    write_list_to_csv(chapters, 'chapters')

    #writes contraccts
    write_list_to_csv(contracts, 'contracts')

    #writes jobs
    write_list_to_csv(jobs, 'jobs')

    #writes people
    write_list_to_csv(persons, 'persons')



