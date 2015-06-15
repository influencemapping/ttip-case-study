# Correct!v data to Pololo

# Person
    #Memberships
# Organizations


import os
import json
from pprint import pprint
from normality import slugify

persons = {}
organizations = {}

with open('data/ttip_correctiv_en.json', 'rb') as fh:
    data = json.load(fh)
    for person in data.get('persons').values():
        #pprint(person)
        p = {
            'id' : slugify(person.get('name')),
            'name' : person.get('name'),
            'memberships' : []
        }
        for job in person.get('jobs'):
            orgId = slugify(job.get('organisation'))
            if orgId not in organizations:
                organizations[orgId] = {
                    'id': orgId,
                    'name': job.get('organisation')
                }
            m = {
                'role' : job.get('position'),
                'organization_id': orgId,
                'person_id': p['id']
            }
            p['memberships'].append(m)

        persons[p['id']] = p


with open('data/ttip_popolo_en.json', 'wb') as fh:
    results = { 'persons': persons.values(), 'organizations' : organizations.values() }
    fh.write(json.dumps(results, indent=2))

