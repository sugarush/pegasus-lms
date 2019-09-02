from unittest import TestCase, skip

from sugar_document import Document

import handlers
import resource

from server import server

from util import authenticate, request



class TestAPI(TestCase):

    def test_time(self):
        token = authenticate(server)
        response = request(server, token).get('/v1/time')
        self.assertTrue(response.data.attributes.time)

    def test_time1(self):
        token = authenticate(server)
        response = request(server, token).get('/v1/time')
        self.assertTrue(response.data.attributes.time)
